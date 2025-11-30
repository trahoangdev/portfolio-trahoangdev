export interface ToolRecord {
  readonly id: string;
  readonly name: string;
  readonly techId: string;
  readonly category: string;
  readonly description?: string;
}

export const TOOL_DATA: ToolRecord[] = [
  {
    id: 'react',
    name: 'React',
    techId: 'react',
    category: 'Frontend',
    description: 'Component-driven UI architecture and concurrent rendering.',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    techId: 'next.js',
    category: 'Frontend',
    description: 'App router, streaming server components, and edge-first mindset.',
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    techId: 'tailwindcss',
    category: 'Frontend',
    description: 'Design system tokens with utility-first ergonomics.',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    techId: 'typescript',
    category: 'Frontend',
    description: 'Type-safe patterns, generics, and domain modelling.',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    techId: 'node.js',
    category: 'Backend',
    description: 'Lightweight APIs, automation scripts, and platform tooling.',
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    techId: 'fastapi',
    category: 'Backend',
    description: 'Async-first Python microservices with automatic docs.',
  },
  {
    id: 'python',
    name: 'Python',
    techId: 'python',
    category: 'Backend',
    description: 'Automation, scripting, and AI-first experimentation.',
  },
  {
    id: 'docker',
    name: 'Docker',
    techId: 'docker',
    category: 'Backend',
    description: 'Container workflows, reproducible environments, and CI.',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    techId: 'postgresql',
    category: 'SQL',
    description: 'Relational backbone with JSON support and materialized views.',
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    techId: 'sqlite',
    category: 'SQL',
    description: 'Edge-friendly relational engine for prototypes.',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    techId: 'vscode',
    category: 'App',
    description: 'Daily driver editor tuned for rapid experimentation.',
  },
  {
    id: 'github-desktop',
    name: 'GitHub',
    techId: 'github',
    category: 'App',
    description: 'Collaboration, reviews, and open-source presence.',
  },
];
