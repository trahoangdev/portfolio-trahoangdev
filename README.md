# Personal Portfolio

<div align="center">

![Portfolio](https://img.shields.io/badge/Portfolio-2026-blue?style=for-the-badge&logo=react&logoColor=white)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey?style=for-the-badge)](LICENSE)

**Personal portfolio website of Tra Hoang Trong (`trahoangdev`)**

[Live Preview](https://trahoangdev.me) · [RSS Feed](https://www.trahoangdev.me/feed.xml) · [GitHub](https://github.com/trahoangdev)

</div>

## Overview

This is a personal portfolio website built with **Next.js 16**, **React 19 RC**, **TypeScript**, and **Tailwind CSS 4**. The project serves as a digital garden to showcase personal profile, projects, technical blog posts, experience, certificates, resume, and tools being used.

The project is designed as production-ready with SEO, RSS, structured data, error monitoring, analytics, security headers, automated testing, and a clear feature-based architecture.

## Key Features

- **Modern personal portfolio**: Homepage showcasing profile, projects, latest blog posts, work philosophy, and contact information.
- **App Router**: Using Next.js App Router with server actions, route handlers, and static generation where appropriate.
- **Blog MDX**: Blog content stored in `content/posts`, supporting metadata, tags, reading time, and detail pages by slug.
- **RSS Feed**: Automatically provides feed at `/feed.xml`.
- **Dynamic project showcase**: Fetches project data from GitHub and Hugging Face via data source/repository layer.
- **Visitor counter**: Tracks visits using Upstash Redis with atomic increment and Redis-backed rate limiting.
- **Dark mode**: Supports light/dark themes via `next-themes`.
- **Animations**: Smooth interactions with Framer Motion and custom UI effects.
- **SEO & metadata**: Includes Open Graph, Twitter cards, sitemap, robots, and Schema.org.
- **Observability**: Integrated with Sentry, Vercel Analytics, and Vercel Speed Insights.
- **Security headers**: Configured with HSTS, CSP, frame options, referrer policy, and permissions policy.
- **Testing**: Includes Jest, Testing Library, type-check, and lint pipeline.

## Tech stack

| Category | Technologies |
| --- | --- |
| **Core** | Next.js 16, React 19 RC, TypeScript |
| **Styling** | Tailwind CSS 4, `@tailwindcss/postcss`, `tailwind-merge`, `tailwindcss-animate`, `tw-animate-css` |
| **UI & UX** | Framer Motion, Lucide React, React Icons, Sonner |
| **Content** | MDX, Gray Matter, React Markdown, Remark GFM, `next-mdx-remote` |
| **Data & cache** | Upstash Redis, Vercel KV, Redis |
| **Monitoring** | Sentry, Vercel Analytics, Vercel Speed Insights |
| **Testing** | Jest, Testing Library, jsdom |
| **Tooling** | ESLint 9, TypeScript, PostCSS |
| **Deployment** | Vercel |

## Project Architecture

The project follows a **Feature-based / Vertical Slicing Architecture**. Each feature groups domain, application logic, infrastructure, module/controller, and related components together for easier scalability and maintenance.

```text
portfolio-trahoangdev/
├── content/
│   └── posts/                  # MDX blog posts
├── public/                     # Static assets
├── src/
│   ├── app/                    # Next.js App Router, pages, routes, server actions
│   ├── components/             # Shared/global UI components
│   ├── features/
│   │   ├── blog/               # Blog components, service, types
│   │   ├── certificates/       # Certificate showcase
│   │   ├── intro/              # Intro section, overlay, website info
│   │   ├── projects/           # Project domain, application, infrastructure, module, UI
│   │   ├── shared/             # Shared domain/infrastructure primitives
│   │   ├── system/             # Diagnostics/system utilities
│   │   └── tools/              # Tool palette/domain/application
│   ├── hooks/                  # Shared React hooks
│   └── lib/                    # Analytics, cache, schema, constants, utils, validation
├── __tests__/                  # Unit/component tests
├── docs/                       # Additional documentation
├── next.config.ts              # Next.js + Sentry + security headers
├── postcss.config.mjs          # Tailwind CSS 4 via PostCSS
├── jest.config.js              # Jest config
└── package.json
```

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Portfolio homepage |
| `/blog` | Blog post list |
| `/blog/[slug]` | MDX blog post detail |
| `/project` | Project showcase page |
| `/certificates` | Certificates |
| `/experience` | Experience |
| `/resume` | Resume/CV |
| `/feed.xml` | RSS feed |
| `/sitemap.xml` | Sitemap |
| `/robots.txt` | Robots config |
| `/api/visitor` | Visitor counter API |

## Key Data Flows

### Blog

- Posts are stored at `content/posts/*.mdx`.
- Metadata is parsed using `gray-matter`.
- Blog list and detail pages are rendered through routes in `src/app/blog`.
- RSS feed fetches post data to output standard RSS 2.0.

### Projects

The projects feature is divided into multiple layers:

- **Domain**: `Project`, `ProjectCollection`, `ProjectFilter`, `ProjectProfile`.
- **Application**: `ProjectCatalogService`, `ProjectRefreshService`, `ProjectDataManager`.
- **Infrastructure**: GitHub/Hugging Face data sources, repository, profile providers.
- **Module**: Factory creating controllers for catalog, refresh, and preference.
- **UI**: Project section, showcase, filter bar, pagination.

Supported data sources:

- GitHub repositories
- Hugging Face models
- Hugging Face spaces

### Visitor counter

The visitor counter uses Upstash Redis:

- `GET /api/visitor`: reads total visit count.
- `POST /api/visitor`: increments visit count using Redis atomic `INCR`.
- Rate limiting uses Redis keys with TTL, better suited for serverless/edge runtime.
- When Redis is not configured, the API returns `available: false` so the UI doesn't display incorrect numbers.

## System Requirements

- **Node.js**: recommended Node.js 20+
- **Package manager**: npm
- **Deployment**: Vercel or environment supporting Next.js 16

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Run Next.js development server |
| `npm run build` | Build production |
| `npm run start` | Run production server after build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Type-check using `tsc --noEmit` |
| `npm run test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run test:ci` | Run tests in CI mode |

## Testing and Quality

Commands to run before commit/deploy:

```bash
npm run type-check
npm run lint
npm run test
npm run build
```

Latest test status:

```text
Test Suites: 18 passed, 18 total
Tests: 181 passed, 181 total
```

## SEO, RSS and Metadata

SEO configuration is in `src/app/layout.tsx` with schemas in `src/lib/schema`.

- Production metadata base: `https://www.trahoangdev.me`
- Open Graph image: `/og-image.png`
- RSS feed: `https://www.trahoangdev.me/feed.xml`
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
- Schema.org: Person, Article, Breadcrumb

## Security

Security headers are configured in `next.config.ts`, including:

- `Strict-Transport-Security`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `X-XSS-Protection`
- `Referrer-Policy`
- `Permissions-Policy`
- `Cross-Origin-Embedder-Policy`
- `Cross-Origin-Opener-Policy`
- `Cross-Origin-Resource-Policy`
- `Content-Security-Policy`

## License

This project is licensed under **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)**.

See details at [LICENSE](LICENSE).

## Author

**Tra Hoang Trong (`trahoangdev`)**

- **Website**: [www.trahoangdev.me](https://www.trahoangdev.me)
- **GitHub**: [@trahoangdev](https://github.com/trahoangdev)
- **LinkedIn**: [Tra Hoang](https://www.linkedin.com/in/trahoangdev)
- **Email**: [trahoangdev@gmail.com](mailto:trahoangdev@gmail.com)

---

> "Simplicity is the ultimate sophistication." — Leonardo da Vinci
