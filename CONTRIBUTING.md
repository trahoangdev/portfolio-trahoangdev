# 🤝 Contributing Guide

Thank you for your interest in contributing to this portfolio project! This guide will help you get started.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Testing](#testing)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what is best for the community

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** 18.x or higher
- **pnpm:** 8.x or higher
- **Git:** Latest version

### Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio-trahoangdev.git
   cd portfolio-trahoangdev
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

5. **Run development server**
   ```bash
   pnpm dev
   ```

6. **Open browser**
   ```
   http://localhost:3000
   ```

---

## 🔄 Development Workflow

### 1. Create a Branch

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Create bugfix branch
git checkout -b fix/bug-description

# Create docs branch
git checkout -b docs/documentation-update
```

### 2. Make Changes

- Write clean, readable code
- Follow the code style guide
- Add tests for new features
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run tests
pnpm test

# Run linter
pnpm lint

# Type check
pnpm type-check

# Build project
pnpm build
```

### 4. Commit Your Changes

```bash
# Stage changes
git add .

# Commit with conventional commit message
git commit -m "feat: add new feature"
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

- Go to the original repository
- Click "New Pull Request"
- Select your branch
- Fill in the PR template
- Submit for review

---

## 🎨 Code Style

### TypeScript

```typescript
// ✅ Good: Use interfaces for props
interface ProjectProps {
  readonly id: string;
  readonly title: string;
}

// ✅ Good: Use readonly for immutability
export class Project {
  private readonly id: string;
  private readonly title: string;
}

// ✅ Good: Use descriptive names
function validateGitHubUsername(username: string): boolean {
  return /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(username);
}

// ❌ Bad: Vague names
function validate(u: string): boolean {
  return /regex/.test(u);
}
```

### React Components

```typescript
// ✅ Good: Functional components with TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 rounded-lg"
    >
      {label}
    </button>
  );
}

// ❌ Bad: No types, unclear props
export function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### File Naming

```
✅ Good:
- ProjectCard.tsx (PascalCase for components)
- useTheme.ts (camelCase for hooks)
- validation.ts (camelCase for utilities)
- Project.ts (PascalCase for classes)

❌ Bad:
- project-card.tsx
- UseTheme.ts
- Validation.ts
```

### Import Order

```typescript
// 1. React and Next.js
import React from 'react';
import { Metadata } from 'next';

// 2. External libraries
import { clsx } from 'clsx';

// 3. Internal modules (domain, application, infrastructure)
import { Project } from '@/domain/projects/Project';
import { ProjectCatalogService } from '@/application/projects/ProjectCatalogService';

// 4. Components
import { Button } from '@/components/ui/Button';

// 5. Utilities and constants
import { validateEmail } from '@/lib/validation';
import { SCROLL_THRESHOLD } from '@/lib/constants/ui';

// 6. Types
import type { ProjectProps } from '@/domain/projects/Project';

// 7. Styles
import './styles.css';
```

---

## 🧪 Testing

### Writing Tests

```typescript
// Test file naming: *.test.ts or *.test.tsx
// Location: __tests__/ directory

describe('Project', () => {
  // Group related tests
  describe('constructor', () => {
    it('creates project with required properties', () => {
      const project = new Project({
        id: 'test-1',
        title: 'Test Project',
        summary: 'Test summary',
        date: '2024-01-01',
        categories: ['Web'],
        languages: ['TypeScript'],
        image: '/test.jpg',
      });

      expect(project.getId()).toBe('test-1');
      expect(project.getTitle()).toBe('Test Project');
    });

    it('throws error for empty title', () => {
      expect(() => new Project({
        id: 'test-1',
        title: '',
        // ... other props
      })).toThrow('Project requires a title.');
    });
  });
});
```

### Test Coverage

- Aim for 80%+ coverage
- 100% coverage for domain entities
- 100% coverage for application services
- Test edge cases and error handling

### Running Tests

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run specific test
pnpm test -- Project.test.ts

# Watch mode
pnpm test:watch
```

---

## 📝 Commit Guidelines

### Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation changes
- **style:** Code style changes (formatting, etc.)
- **refactor:** Code refactoring
- **test:** Adding or updating tests
- **chore:** Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(projects): add project filtering by category"

# Bug fix
git commit -m "fix(validation): correct GitHub username regex"

# Documentation
git commit -m "docs: update contributing guide"

# Refactoring
git commit -m "refactor(domain): extract Tag class to shared module"

# Tests
git commit -m "test(services): add tests for ProjectCatalogService"

# Breaking change
git commit -m "feat(api)!: change project data structure

BREAKING CHANGE: Project interface now requires 'featured' property"
```

---

## 🔍 Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all checks**
   ```bash
   pnpm lint
   pnpm type-check
   pnpm test
   pnpm build
   ```

3. **Update documentation**
   - Update README if needed
   - Add JSDoc comments
   - Update CHANGELOG

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

### Review Process

1. **Automated Checks**
   - Linting
   - Type checking
   - Tests
   - Build

2. **Code Review**
   - At least one approval required
   - Address all comments
   - Keep discussions constructive

3. **Merge**
   - Squash and merge
   - Delete branch after merge

---

## 🏗️ Project Structure

```
src/
├── domain/          # Business logic (no dependencies)
├── application/     # Use cases (depends on domain)
├── infrastructure/  # External integrations
├── components/      # React components
├── modules/         # Feature modules
├── hooks/           # Custom hooks
└── lib/             # Utilities
```

### Adding New Features

1. **Domain Layer**
   - Create entity classes
   - Add validation logic
   - Write unit tests

2. **Application Layer**
   - Create service classes
   - Implement use cases
   - Write service tests

3. **Infrastructure Layer**
   - Implement repositories
   - Add data sources
   - Handle external APIs

4. **Presentation Layer**
   - Create React components
   - Add styling
   - Implement user interactions

---

## 🐛 Reporting Bugs

### Before Reporting

1. Check existing issues
2. Verify it's reproducible
3. Test on latest version

### Bug Report Template

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Node: [e.g., 18.17.0]

## Screenshots
If applicable
```

---

## 💡 Feature Requests

### Feature Request Template

```markdown
## Problem
What problem does this solve?

## Proposed Solution
How should it work?

## Alternatives
Other solutions considered

## Additional Context
Any other information
```

---

## 📚 Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## 🙏 Thank You!

Your contributions make this project better. Thank you for taking the time to contribute!

**Questions?** Feel free to open an issue or reach out via the portfolio contact form.

---

**Maintained by:** trahoangdev  
**License:** MIT
