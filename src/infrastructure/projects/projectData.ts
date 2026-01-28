export interface ProjectRecord {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly date: string;
  readonly categories: string[];
  readonly languages: string[];
  readonly link?: string;
  readonly image: string;
  readonly featured?: boolean;
  readonly demoImages?: string[];
}

export const PROJECT_DATA: ProjectRecord[] = [
  {
    id: 'taikhoanxin',
    title: 'Tài Khoản Xịn',
    summary:
      'A premier marketplace for digital access. Connecting users with top-tier service accounts through a seamless, automated platform. Quality, reliability, and speed—delivered.',
    date: 'Oct 2025',
    categories: ['Web Development', 'E-commerce'],
    languages: ['Next.js', 'TypeScript', 'Supabase', 'Shadcn UI'],
    link: 'https://taikhoanxin.com',
    image: '/projects/taikhoanxin.png',
    featured: true,
    demoImages: ['/projects/taikhoanxin.png'],
  },
  {
    id: 'dev-orbit-blog',
    title: 'DevOrbit - Blog Platform',
    summary:
      'An open-source blog platform designed for developers. Features MDX support, syntax highlighting, dark mode, and a highly optimized reading experience.',
    date: 'Dec 2025',
    categories: ['Web Development', 'Open Source'],
    languages: ['Next.js', 'TypeScript', 'TailwindCSS', 'MDX'],
    link: 'https://devorbitblog.vercel.app',
    image: '/projects/blog.png',
    featured: true,
    demoImages: ['/projects/blog.png'],
  },
  {
    id: 'portfolio-website',
    title: 'Personal Portfolio',
    summary:
      'A modern, high-performance portfolio built with Next.js 16 and Tailwind CSS 4. Features a matrix-themed design, interactive particles background, and seamless animations.',
    date: 'Dec 2025',
    categories: ['Web Development', 'Minimal App'],
    languages: ['Next.js', 'TailwindCSS', 'TypeScript', 'Redis'],
    link: 'https://trahoangdev.vercel.app',
    image: '/projects/portfolio.png',
    featured: true,
    demoImages: ['/projects/portfolio.png'],
  },
  {
    id: 'luxe-wear-ai',
    title: 'LUXWEAR AI',
    summary:
      'SaaS platforms enable businesses to build, deploy, and manage AI agents. The system supports real-time data integration, performs actions across third-party systems, and provides detailed analytical reporting.',
    date: 'Jul 2025',
    categories: ['Web Development', 'SaaS', 'AI'],
    languages: ['React', 'Next.js', 'TailwindCSS', 'TypeScript', 'Gemini AI'],
    link: 'https://luxwearai.vercel.app',
    image: '/projects/luxe-wear.png',
    featured: true,
    demoImages: ['/projects/luxe-wear.png'],
  },
];
