# 🏗️ Architecture Guide

**Last Updated:** December 1, 2025  
**Version:** 1.0.0

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture Layers](#architecture-layers)
- [Design Patterns](#design-patterns)
- [Data Flow](#data-flow)
- [Directory Structure](#directory-structure)
- [Key Components](#key-components)
- [Best Practices](#best-practices)

---

## 🎯 Overview

This portfolio is built using **Clean Architecture** principles with **Domain-Driven Design (DDD)** patterns. The architecture is organized into distinct layers, each with specific responsibilities and dependencies flowing inward.

### Core Principles

1. **Separation of Concerns** - Each layer has a single, well-defined responsibility
2. **Dependency Inversion** - Dependencies point inward toward the domain
3. **Testability** - Business logic is isolated and easily testable
4. **Maintainability** - Clear structure makes code easy to understand and modify

### Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.9
- **Styling:** Tailwind CSS 4.0
- **State Management:** React Hooks
- **Testing:** Jest + React Testing Library
- **Deployment:** Vercel (Edge Runtime)

---

## 🏛️ Architecture Layers

### 1. Domain Layer (`src/domain/`)

**Purpose:** Contains core business logic and entities

**Characteristics:**
- No external dependencies
- Pure TypeScript classes
- Business rules and validation
- 100% test coverage

**Components:**
```
domain/
├── projects/
│   ├── Project.ts          # Project entity
│   ├── ProjectCollection.ts # Collection operations
│   ├── ProjectFilter.ts     # Filtering logic
│   └── ProjectProfile.ts    # User profile
├── tools/
│   ├── Tool.ts             # Tool entity
│   ├── ToolCollection.ts   # Tool grouping
│   └── ToolRepository.ts   # Repository interface
└── shared/
    ├── Tag.ts              # Tag entity
    ├── TagSet.ts           # Tag collection
    └── HttpClient.ts       # HTTP interface
```

**Example:**
```typescript
/**
 * Project entity with validation and immutability
 */
export class Project {
  constructor(props: ProjectProps) {
    this.id = props.id.trim();
    this.title = props.title.trim();
    this.ensureInvariants();
  }

  private ensureInvariants(): void {
    if (!this.id) throw new Error('Project requires ID');
    if (!this.title) throw new Error('Project requires title');
  }
}
```

### 2. Application Layer (`src/application/`)

**Purpose:** Orchestrates business logic and use cases

**Characteristics:**
- Depends only on domain layer
- Implements use cases
- Coordinates between repositories
- No UI concerns

**Components:**
```
application/
├── projects/
│   ├── ProjectCatalogService.ts    # Catalog management
│   ├── FeaturedProjectService.ts   # Featured projects
│   ├── ProjectDataManager.ts       # Data aggregation
│   └── ProjectRefreshService.ts    # Data refresh
└── tools/
    └── ToolPaletteService.ts       # Tool palette
```

**Example:**
```typescript
/**
 * Service for managing project catalog with filtering
 */
export class ProjectCatalogService {
  async loadCatalog(filterProps: ProjectFilterProps): Promise<ProjectCatalogDto> {
    const collection = await this.refreshService.refresh();
    const filter = new ProjectFilter(filterProps);
    return collection.filter(filter);
  }
}
```

### 3. Infrastructure Layer (`src/infrastructure/`)

**Purpose:** Implements external integrations and data sources

**Characteristics:**
- Implements domain interfaces
- Handles external APIs
- Manages data persistence
- Adapts external data to domain models

**Components:**
```
infrastructure/
├── projects/
│   ├── sources/
│   │   ├── GitHubProjectDataSource.ts    # GitHub API
│   │   ├── HuggingFaceDataSource.ts      # HuggingFace API
│   │   └── StaticProjectDataSource.ts    # Static data
│   ├── projectData.ts                     # Static projects
│   └── RemoteProjectRepository.ts         # Repository impl
├── tools/
│   └── StaticToolRepository.ts            # Tool data
└── shared/
    └── FetchHttpClient.ts                 # HTTP client
```

**Example:**
```typescript
/**
 * GitHub API data source with rate limiting
 */
export class GitHubProjectDataSource implements ProjectDataSource {
  async fetch(profile: ProjectProfile): Promise<ExternalProjectRecord[]> {
    const repos = await this.client.get<GitHubRepo[]>(
      `https://api.github.com/users/${profile.github}/repos`
    );
    return repos.map(this.mapToProject);
  }
}
```

### 4. Presentation Layer (`src/components/`, `src/modules/`)

**Purpose:** UI components and user interactions

**Characteristics:**
- React components
- Hooks for state management
- Styling with Tailwind CSS
- Accessibility features

**Components:**
```
components/
├── intro/              # Introduction section
├── projects/           # Project showcase
├── work/              # Work experience
├── connect/           # Contact section
├── navigation/        # Navigation components
├── theme/             # Theme management
└── ui/                # Reusable UI components

modules/
└── projects/
    └── presentation/
        └── ProjectExplorer.tsx  # Main project UI
```

---

## 🎨 Design Patterns

### 1. Repository Pattern

**Purpose:** Abstract data access logic

```typescript
// Domain interface
export interface ToolRepository {
  findAll(): Promise<ToolCollection>;
}

// Infrastructure implementation
export class StaticToolRepository implements ToolRepository {
  async findAll(): Promise<ToolCollection> {
    return new ToolCollection(TOOLS);
  }
}
```

### 2. Service Pattern

**Purpose:** Encapsulate business logic

```typescript
export class ProjectCatalogService {
  constructor(private readonly refreshService: ProjectRefreshService) {}

  async loadCatalog(filters: ProjectFilterProps): Promise<ProjectCatalogDto> {
    // Business logic here
  }
}
```

### 3. Value Object Pattern

**Purpose:** Immutable objects with validation

```typescript
export class Tag {
  private readonly label: string;
  private readonly slug: string;

  constructor(props: TagProps) {
    this.label = props.label.trim();
    this.slug = Tag.slugify(this.label);
    this.ensureInvariants();
  }
}
```

### 4. Factory Pattern

**Purpose:** Create complex objects

```typescript
export class ProjectCollection {
  static fromRecords(records: ExternalProjectRecord[]): ProjectCollection {
    const projects = records.map(record => new Project(record));
    return new ProjectCollection(projects);
  }
}
```

### 5. Strategy Pattern

**Purpose:** Interchangeable algorithms

```typescript
export class ProjectFilter {
  filter(collection: ProjectCollection): ProjectCollection {
    let filtered = collection;
    
    if (this.hasCategories()) {
      filtered = filtered.filterByCategories(this.categories);
    }
    
    if (this.hasLanguages()) {
      filtered = filtered.filterByLanguages(this.languages);
    }
    
    return filtered;
  }
}
```

---

## 🔄 Data Flow

### Project Loading Flow

```
User Request
    ↓
ProjectExplorer (UI)
    ↓
ProjectCatalogService (Application)
    ↓
ProjectRefreshService (Application)
    ↓
ProjectDataManager (Application)
    ↓
[GitHubDataSource, StaticDataSource] (Infrastructure)
    ↓
External APIs / Static Data
    ↓
ProjectCollection (Domain)
    ↓
Filtered Projects
    ↓
UI Rendering
```

### Filtering Flow

```
User Selects Filter
    ↓
ProjectExplorer Updates State
    ↓
ProjectCatalogService.loadCatalog(filters)
    ↓
ProjectFilter.filter(collection)
    ↓
Filtered ProjectCollection
    ↓
UI Re-renders with Filtered Projects
```

---

## 📁 Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── project/           # Project page
│   ├── error.tsx          # Error boundary
│   └── globals.css        # Global styles
│
├── domain/                # Business logic (no dependencies)
│   ├── projects/          # Project entities
│   ├── tools/             # Tool entities
│   └── shared/            # Shared domain logic
│
├── application/           # Use cases (depends on domain)
│   ├── projects/          # Project services
│   └── tools/             # Tool services
│
├── infrastructure/        # External integrations
│   ├── projects/          # Project data sources
│   ├── tools/             # Tool repositories
│   └── shared/            # Shared infrastructure
│
├── components/            # React components
│   ├── intro/             # Introduction section
│   ├── projects/          # Project components
│   ├── work/              # Work experience
│   ├── connect/           # Contact section
│   ├── navigation/        # Navigation
│   ├── theme/             # Theme management
│   └── ui/                # Reusable UI
│
├── modules/               # Feature modules
│   └── projects/          # Project module
│       └── presentation/  # Project UI
│
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities
│   ├── constants/         # Constants
│   ├── utils/             # Helper functions
│   └── validation.ts      # Validation logic
│
└── styles/                # Additional styles
```

---

## 🔑 Key Components

### ProjectExplorer

**Purpose:** Main UI for browsing projects

**Features:**
- Project filtering by category/language
- Tool palette display
- Responsive grid layout
- Loading states

**Dependencies:**
- ProjectCatalogService
- ToolPaletteService

### ProjectDataManager

**Purpose:** Aggregates data from multiple sources

**Features:**
- Merges GitHub and static projects
- Deduplicates projects
- Handles errors gracefully

**Dependencies:**
- Multiple ProjectDataSource implementations

### FetchHttpClient

**Purpose:** HTTP client with retry logic

**Features:**
- Automatic retry on rate limiting (429)
- Exponential backoff
- Network error handling
- Configurable max retries

---

## ✅ Best Practices

### 1. Dependency Management

```typescript
// ✅ Good: Depend on interfaces
class Service {
  constructor(private readonly repo: ProjectRepository) {}
}

// ❌ Bad: Depend on concrete implementations
class Service {
  constructor(private readonly repo: StaticProjectRepository) {}
}
```

### 2. Error Handling

```typescript
// ✅ Good: Specific error messages
if (!this.id) {
  throw new Error('Project requires a stable identifier.');
}

// ❌ Bad: Generic errors
if (!this.id) {
  throw new Error('Invalid project');
}
```

### 3. Immutability

```typescript
// ✅ Good: Readonly properties
export class Project {
  private readonly id: string;
  private readonly title: string;
}

// ❌ Bad: Mutable state
export class Project {
  public id: string;
  public title: string;
}
```

### 4. Single Responsibility

```typescript
// ✅ Good: One responsibility
export class ProjectFilter {
  filter(collection: ProjectCollection): ProjectCollection {
    // Only filtering logic
  }
}

// ❌ Bad: Multiple responsibilities
export class ProjectManager {
  filter() {}
  save() {}
  load() {}
  validate() {}
}
```

### 5. Testing

```typescript
// ✅ Good: Test business logic
describe('Project', () => {
  it('throws error for empty title', () => {
    expect(() => new Project({ ...props, title: '' }))
      .toThrow('Project requires a title');
  });
});

// ✅ Good: Mock dependencies
const mockRepo = {
  findAll: jest.fn().mockResolvedValue(collection),
};
```

---

## 🚀 Performance Considerations

### 1. ISR (Incremental Static Regeneration)

```typescript
// Revalidate project page every hour
export const revalidate = 3600;
```

### 2. Dynamic Imports

```typescript
// Lazy load heavy components
const ProjectExplorer = dynamic(
  () => import('@/modules/projects/presentation/ProjectExplorer'),
  { loading: () => <LoadingSkeleton /> }
);
```

### 3. Image Optimization

```typescript
// Use Next.js Image component
<Image
  src="/portrait.jpg"
  alt="Portrait"
  width={400}
  height={400}
  priority
/>
```

### 4. Caching Strategy

- Static data cached at build time
- API responses cached with ISR
- Client-side caching with React Query (future)

---

## 🔐 Security

### 1. Environment Variables

```bash
# ✅ Server-only (no NEXT_PUBLIC_ prefix)
GITHUB_TOKEN="ghp_xxx"

# ✅ Client-safe (with NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_SITE_URL="https://example.com"
```

### 2. Security Headers

- Strict-Transport-Security
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy

### 3. Input Validation

```typescript
export function validateGitHubUsername(username: string): boolean {
  return /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(username);
}
```

---

## 📚 Further Reading

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Maintained by:** trahoangdev  
**Questions?** Open an issue or contact via portfolio
