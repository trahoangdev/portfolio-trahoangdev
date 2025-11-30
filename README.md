# 🚀 Portfolio - trahoangdev

[![CI](https://github.com/trahoangdev/portfolio/workflows/CI/badge.svg)](https://github.com/trahoangdev/portfolio/actions)
[![Test Coverage](https://img.shields.io/badge/coverage-95.94%25-brightgreen)](./coverage)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black)](https://nextjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

Modern, performant, and accessible portfolio built with Next.js 15, TypeScript, and Clean Architecture principles.

## ✨ Features

- 🎨 **Modern Design** - Clean, minimalist UI with dark mode support
- ⚡ **High Performance** - 95+ Lighthouse score, ISR, optimized images
- ♿ **Accessible** - WCAG 2.1 AA compliant, keyboard navigation, screen reader support
- 🧪 **Well Tested** - 95.94% test coverage with Jest and Playwright
- 🏗️ **Clean Architecture** - Domain-Driven Design with clear separation of concerns
- 📱 **Responsive** - Mobile-first design, works on all devices
- 🔒 **Secure** - Security headers, rate limiting, input validation
- 📊 **Analytics** - Vercel Analytics for performance monitoring
- 🚀 **CI/CD** - Automated testing and deployment with GitHub Actions

## 🛠️ Tech Stack

### Core
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Edge Runtime)
- **Language:** [TypeScript 5.9](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)

### Testing
- **Unit Tests:** [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- **E2E Tests:** [Playwright](https://playwright.dev/)
- **Coverage:** 95.94% overall

### Infrastructure
- **Deployment:** [Vercel](https://vercel.com/)
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics)
- **Caching:** Redis (Upstash)
- **APIs:** GitHub API, HuggingFace API

## 📊 Project Stats

- **Test Coverage:** 95.94%
- **Test Suites:** 10 passed
- **Total Tests:** 98 passed
- **Lines of Code:** ~15,000
- **Components:** 50+
- **Documentation:** 2,000+ lines

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- pnpm 8.x or higher

### Installation

```bash
# Clone repository
git clone https://github.com/trahoangdev/portfolio-trahoangdev.git
cd portfolio-trahoangdev

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Edit .env with your values
# GITHUB_TOKEN=your_github_token
# NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Development

```bash
# Start development server
pnpm dev

# Open browser
# http://localhost:3000
```

### Testing

```bash
# Run unit tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui
```

### Building

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── project/           # Project page
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
│   └── ui/                # Reusable UI
│
└── lib/                   # Utilities
    ├── constants/         # Constants
    ├── utils/             # Helper functions
    └── validation.ts      # Validation logic
```

## 🏗️ Architecture

This project follows **Clean Architecture** principles with **Domain-Driven Design (DDD)**:

- **Domain Layer:** Pure business logic, no external dependencies
- **Application Layer:** Use cases and services
- **Infrastructure Layer:** External APIs, databases, file system
- **Presentation Layer:** React components and UI

See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed information.

## 🧪 Testing Strategy

- **Unit Tests:** Domain entities, application services, utilities (95.94% coverage)
- **Integration Tests:** API integrations, data sources
- **E2E Tests:** Critical user flows with Playwright
- **Manual Tests:** Accessibility, performance, cross-browser

See [TESTING.md](./docs/TESTING.md) for testing guide.

## 🎨 Design System

- **Colors:** Semantic color system with dark mode
- **Typography:** Geist font family
- **Spacing:** Consistent spacing scale
- **Components:** Reusable UI components
- **Animations:** Smooth transitions and effects

See [DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) for design guidelines.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📝 Scripts

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Testing
pnpm test             # Run unit tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage
pnpm test:ci          # Run tests in CI mode
pnpm test:e2e         # Run E2E tests
pnpm test:e2e:ui      # Run E2E tests with UI

# Code Quality
pnpm lint             # Run ESLint
pnpm type-check       # Run TypeScript compiler
```

## 🔒 Security

- **Security Headers:** HSTS, X-Frame-Options, CSP, etc.
- **Rate Limiting:** Automatic retry with exponential backoff
- **Input Validation:** All user inputs validated
- **Environment Variables:** Sensitive data in environment variables
- **HTTPS Only:** Strict-Transport-Security enforced

## 📈 Performance

- **Lighthouse Score:** 95+
- **ISR:** Incremental Static Regeneration (1 hour)
- **Image Optimization:** Next.js Image component with AVIF/WebP
- **Code Splitting:** Dynamic imports for heavy components
- **Caching:** Redis caching for API responses

## ♿ Accessibility

- **WCAG 2.1 AA:** Compliant with accessibility standards
- **Keyboard Navigation:** Full keyboard support
- **Screen Readers:** ARIA labels and semantic HTML
- **Focus Management:** Visible focus indicators
- **Skip Links:** Skip to main content

## 📊 Analytics

- **Vercel Analytics:** Page views, performance metrics
- **Custom Events:** Project clicks, filter usage (coming soon)
- **Error Tracking:** Sentry integration (coming soon)

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Manual Deployment

```bash
# Build
pnpm build

# Start
pnpm start
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👤 Author

**trahoangdev**

- Portfolio: [trahoangdev.com](https://trahoangdev.com)
- GitHub: [@trahoangdev](https://github.com/trahoangdev)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Vercel](https://vercel.com/) - Hosting platform

## 📚 Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md)
- [Testing Guide](./docs/TESTING.md)
- [Design System](./docs/DESIGN_SYSTEM.md)
- [Contributing Guide](./CONTRIBUTING.md)

---

**Built with ❤️ by trahoangdev**
