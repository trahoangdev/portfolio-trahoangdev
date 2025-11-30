# 🧪 Testing Guide

**Last Updated:** December 1, 2025  
**Coverage:** 95.94%  
**Test Suites:** 10 passed  
**Total Tests:** 98 passed

---

## 📋 Table of Contents

- [Overview](#overview)
- [Testing Strategy](#testing-strategy)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Test Patterns](#test-patterns)
- [Coverage Requirements](#coverage-requirements)
- [Best Practices](#best-practices)

---

## 🎯 Overview

This project uses **Jest** and **React Testing Library** for testing. We follow a **test-driven development (TDD)** approach with emphasis on:

- **High coverage** (95.94% overall)
- **Fast execution** (< 2 seconds)
- **Reliable tests** (no flaky tests)
- **Clear assertions** (descriptive test names)

### Test Distribution

| Layer | Coverage | Tests | Status |
|-------|----------|-------|--------|
| Domain Entities | 100% | 52 | ✅ |
| Application Services | 100% | 23 | ✅ |
| Utilities | 100% | 21 | ✅ |
| Infrastructure | 90% | 2 | ⚠️ |
| Components | 0% | 0 | ⏳ |

---

## 🎯 Testing Strategy

### 1. Test Pyramid

```
        /\
       /  \      E2E Tests (Future)
      /____\     - Playwright
     /      \    - Critical user flows
    /________\   
   /          \  Integration Tests (Minimal)
  /____________\ - API integration
 /              \
/________________\ Unit Tests (Primary Focus)
                   - Domain entities
                   - Application services
                   - Utilities
```

### 2. What to Test

#### ✅ Always Test
- Domain entities and business logic
- Application services and use cases
- Utility functions
- Error handling
- Edge cases

#### ⚠️ Sometimes Test
- React components (complex logic only)
- Custom hooks
- Integration with external APIs

#### ❌ Don't Test
- Third-party libraries
- Next.js framework code
- Simple presentational components
- CSS/styling

---

## 🚀 Running Tests

### Basic Commands

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run specific test file
pnpm test -- ProjectTest

# Run tests matching pattern
pnpm test -- --testPathPattern="domain"

# Run tests in silent mode
pnpm test -- --silent
```

### Coverage Report

```bash
# Generate coverage report
pnpm test:coverage

# View HTML report
open coverage/lcov-report/index.html
```

### CI/CD Integration

```bash
# Run in CI mode (no watch, with coverage)
pnpm test:ci
```

---

## ✍️ Writing Tests

### Test File Structure

```typescript
import { Project } from '@/domain/projects/Project';

describe('Project', () => {
  // Setup
  const validProps = {
    id: 'project-1',
    title: 'Test Project',
    summary: 'A test project',
    date: '2024-01-01',
    categories: ['Web'],
    languages: ['TypeScript'],
    image: '/test.jpg',
  };

  describe('constructor', () => {
    it('creates project with required properties', () => {
      const project = new Project(validProps);
      
      expect(project.getId()).toBe('project-1');
      expect(project.getTitle()).toBe('Test Project');
    });

    it('throws error for empty title', () => {
      expect(() => new Project({
        ...validProps,
        title: '',
      })).toThrow('Project requires a title.');
    });
  });

  describe('createSnapshot', () => {
    it('creates snapshot with all properties', () => {
      const project = new Project(validProps);
      const snapshot = project.createSnapshot();
      
      expect(snapshot).toEqual({
        id: 'project-1',
        title: 'Test Project',
        // ... other properties
      });
    });
  });
});
```

### Test Naming Convention

```typescript
// ✅ Good: Descriptive and specific
it('throws error when title is empty string', () => {});
it('returns filtered projects when category matches', () => {});
it('normalizes username by trimming whitespace', () => {});

// ❌ Bad: Vague or unclear
it('works correctly', () => {});
it('test project', () => {});
it('should do something', () => {});
```

---

## 🎨 Test Patterns

### 1. Testing Domain Entities

```typescript
describe('Tool', () => {
  it('creates tool with required properties', () => {
    const tool = new Tool({
      id: 'react',
      name: 'React',
      techId: 'react',
      category: 'Frontend',
    });
    
    expect(tool.getName()).toBe('React');
    expect(tool.getTechId()).toBe('react');
  });

  it('trims whitespace from properties', () => {
    const tool = new Tool({
      id: '  react  ',
      name: '  React  ',
      techId: '  react  ',
      category: 'Frontend',
    });
    
    expect(tool.getName()).toBe('React');
  });

  it('throws error for empty id', () => {
    expect(() => new Tool({
      id: '',
      name: 'React',
      techId: 'react',
      category: 'Frontend',
    })).toThrow('Tool requires a stable identifier.');
  });
});
```

### 2. Testing Application Services

```typescript
describe('FeaturedProjectService', () => {
  let service: FeaturedProjectService;
  let mockRepository: jest.Mocked<ProjectPreferenceRepository>;

  beforeEach(() => {
    mockRepository = {
      loadFeatured: jest.fn(),
      saveFeatured: jest.fn(),
      addListener: jest.fn(),
    };

    service = new FeaturedProjectService(mockRepository);
  });

  it('returns featured project IDs', async () => {
    mockRepository.loadFeatured.mockResolvedValue(['1', '2', '3']);

    const ids = await service.listFeatured();

    expect(ids).toEqual(['1', '2', '3']);
  });

  it('adds project ID to featured list', async () => {
    mockRepository.loadFeatured.mockResolvedValue(['1', '2']);

    const ids = await service.markFeatured('3');

    expect(ids).toEqual(['1', '2', '3']);
    expect(mockRepository.saveFeatured).toHaveBeenCalledWith(['1', '2', '3']);
  });
});
```

### 3. Testing Utilities

```typescript
describe('validateGitHubUsername', () => {
  it('accepts valid usernames', () => {
    expect(validateGitHubUsername('trahoangdev')).toBe(true);
    expect(validateGitHubUsername('user-name')).toBe(true);
    expect(validateGitHubUsername('user123')).toBe(true);
  });

  it('rejects invalid usernames', () => {
    expect(validateGitHubUsername('-invalid')).toBe(false);
    expect(validateGitHubUsername('user--name')).toBe(false);
    expect(validateGitHubUsername('')).toBe(false);
  });

  it('rejects usernames over 39 characters', () => {
    const longUsername = 'a'.repeat(40);
    expect(validateGitHubUsername(longUsername)).toBe(false);
  });
});
```

### 4. Testing with Timers

```typescript
describe('throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('executes function immediately on first call', () => {
    const mockFn = jest.fn();
    const throttled = throttle(mockFn, 100);
    
    throttled();
    
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('throttles subsequent calls', () => {
    const mockFn = jest.fn();
    const throttled = throttle(mockFn, 100);
    
    throttled();
    throttled();
    throttled();
    
    expect(mockFn).toHaveBeenCalledTimes(1);
    
    jest.advanceTimersByTime(100);
    throttled();
    
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
```

### 5. Testing Async Code

```typescript
describe('ProjectCatalogService', () => {
  it('loads catalog without filters', async () => {
    const mockCollection = new ProjectCollection(projects);
    mockRefreshService.refresh.mockResolvedValue(mockCollection);

    const catalog = await service.loadCatalog();

    expect(catalog.projects).toHaveLength(2);
    expect(mockRefreshService.refresh).toHaveBeenCalledTimes(1);
  });

  it('handles errors gracefully', async () => {
    mockRefreshService.refresh.mockRejectedValue(
      new Error('API Error')
    );

    await expect(service.loadCatalog()).rejects.toThrow('API Error');
  });
});
```

---

## 📊 Coverage Requirements

### Minimum Coverage Targets

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Statements | 80% | 95.94% | ✅ |
| Branches | 70% | 92.64% | ✅ |
| Functions | 80% | 97.70% | ✅ |
| Lines | 80% | 98.24% | ✅ |

### Coverage by Layer

```
Domain Layer:        100% ✅
Application Layer:   100% ✅
Utilities:           100% ✅
Infrastructure:       90% ⚠️
Components:            0% ⏳
```

### Viewing Coverage

```bash
# Generate coverage report
pnpm test:coverage

# Coverage files
coverage/
├── lcov-report/     # HTML report
├── lcov.info        # LCOV format
├── clover.xml       # Clover format
└── coverage-final.json
```

---

## ✅ Best Practices

### 1. Test Independence

```typescript
// ✅ Good: Each test is independent
describe('TagSet', () => {
  it('creates empty tag set', () => {
    const tagSet = new TagSet([]);
    expect(tagSet.isEmpty()).toBe(true);
  });

  it('creates tag set from strings', () => {
    const tagSet = new TagSet(['React', 'TypeScript']);
    expect(tagSet.toArray()).toHaveLength(2);
  });
});

// ❌ Bad: Tests depend on each other
describe('TagSet', () => {
  let tagSet: TagSet;

  it('creates tag set', () => {
    tagSet = new TagSet(['React']);
  });

  it('has one tag', () => {
    expect(tagSet.toArray()).toHaveLength(1); // Depends on previous test
  });
});
```

### 2. Clear Assertions

```typescript
// ✅ Good: Specific assertions
expect(project.getTitle()).toBe('Test Project');
expect(projects).toHaveLength(3);
expect(snapshot).toEqual({ id: '1', title: 'Test' });

// ❌ Bad: Vague assertions
expect(project).toBeTruthy();
expect(projects.length > 0).toBe(true);
```

### 3. Test Edge Cases

```typescript
describe('Tag', () => {
  // Normal case
  it('creates tag with label', () => {
    const tag = new Tag({ label: 'TypeScript' });
    expect(tag.getLabel()).toBe('TypeScript');
  });

  // Edge cases
  it('trims whitespace from label', () => {
    const tag = new Tag({ label: '  React  ' });
    expect(tag.getLabel()).toBe('React');
  });

  it('throws error for empty label', () => {
    expect(() => new Tag({ label: '' }))
      .toThrow('Tag label must be a non-empty string.');
  });

  it('throws error for whitespace-only label', () => {
    expect(() => new Tag({ label: '   ' }))
      .toThrow('Tag label must be a non-empty string.');
  });
});
```

### 4. Mock External Dependencies

```typescript
// ✅ Good: Mock external dependencies
const mockRepository: jest.Mocked<ToolRepository> = {
  findAll: jest.fn().mockResolvedValue(mockCollection),
};

const service = new ToolPaletteService(mockRepository);

// ❌ Bad: Use real dependencies in unit tests
const repository = new StaticToolRepository();
const service = new ToolPaletteService(repository);
```

### 5. Descriptive Test Names

```typescript
// ✅ Good: Describes what and why
it('normalizes IDs by trimming whitespace', () => {});
it('removes duplicate IDs from list', () => {});
it('throws error when project ID is empty', () => {});

// ❌ Bad: Unclear purpose
it('test normalization', () => {});
it('handles duplicates', () => {});
it('validates input', () => {});
```

---

## 🐛 Debugging Tests

### 1. Run Single Test

```bash
# Run specific test file
pnpm test -- Project.test.ts

# Run specific test case
pnpm test -- -t "creates project with required properties"
```

### 2. Debug with Console

```typescript
it('debugs test', () => {
  const project = new Project(validProps);
  console.log('Project:', project.createSnapshot());
  expect(project.getId()).toBe('project-1');
});
```

### 3. Use VS Code Debugger

```json
// .vscode/launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal"
}
```

---

## 📚 Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Test-Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)

---

**Maintained by:** trahoangdev  
**Questions?** Open an issue or contact via portfolio
