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
    id: 'portfolio-website',
    title: 'Portfolio Website',
    summary:
      'Crafting a serene, high-performance personal brand experience with intentional motion and storytelling.',
    date: 'Dec 2025',
    categories: ['Web Development', 'Minimal App'],
    languages: ['React', 'Next.js', 'TailwindCSS', 'TypeScript'],
    link: ' ',
    image: '/projects/01.jpg',
    featured: true,
    demoImages: ['/projects/01.jpg'],
  },
  {
    id: 'trahoangdev-blog',
    title: 'trahoangdevBlog',
    summary:
      'A website blog, a place to share knowledge about technology and lessons about Java, Javascript, network programming.',
    date: 'Nov 2025',
    categories: ['Tool Project', 'Minimal App'],
    languages: ['React', 'Next.js', 'TailwindCSS', 'TypeScript'],
    link: 'https://trahoangdev.github.io/trahoangdevBlog/',
    image: '/projects/02.jpg',
    featured: true,
    demoImages: ['/projects/02.jpg'],
  },
  {
    id: 'auto-fill-quizz',
    title: 'Auto-Fill-Quizz',
    summary:
      'No description provided.',
    date: 'Nov 2025',
    categories: ['Tool Project', 'Minimal App'],
    languages: ['JavaScript', 'HTML'],
    link: 'https://github.com/trahoangdev/auto-fill-quizz',
    image: '/projects/03.jpg',
    featured: true,
    demoImages: ['/projects/03.jpg'],
  },
  {
    id: 'lux-wear-ai',
    title: 'LUXWEAR AI',
    summary:
      'LUXWEAR - AI AGENT SALES CONSULTANT (PLATFORM)',
    date: 'Jul 2025',
    categories: ['Web Development', 'Software'],
    languages: ['React', 'Next.js', 'TailwindCSS', 'TypeScript'],
    link: 'https://github.com/trahoangdev/client-luxe-wear-ai',
    image: '/projects/04.jpg',
    featured: true,
    demoImages: ['/projects/04.jpg'],
  },
  /*{
    id: 'token-discord-checker',
    title: 'Token Discord Checker',
    summary:
      'CLI-first utility to audit and manage Discord tokens with ergonomic prompts and safety in mind.',
    date: 'Jun 2025',
    categories: ['Tool Project', 'Software'],
    languages: ['Node.js', 'TypeScript'],
    link: 'https://github.com/trahoangdev/token-discord-checker',
    image: '/projects/discord-token.svg',
    featured: false,
    demoImages: [],
  },
  {
    id: 'gmail-automation-tool',
    title: 'Gmail Automation Tool',
    summary:
      'Automation suite for Gmail triage, built with FastAPI workflows, container-ready deployments, and modular tasks.',
    date: 'Jun 2025',
    categories: ['AI Development', 'Tool Project'],
    languages: ['Python', 'FastAPI', 'Docker'],
    link: 'https://github.com/trahoangdev/Gmail-Automation-Tool',
    image: '/projects/gmail-automation.svg',
    featured: false,
    demoImages: [],
  },
  {
    id: 'selfbot',
    title: 'SelfBot',
    summary:
      'A Discord automation sidekick using discord.py abstractions with safety rails for community testing.',
    date: 'Apr 2025',
    categories: ['Tool Project', 'Software'],
    languages: ['Python', 'Discord.py'],
    link: 'https://github.com/trahoangdev/Python-Hikari-SelfBot',
    image: '/projects/selfbot.svg',
    featured: false,
    demoImages: [],
  },
  {
    id: 'thptqg-countdown',
    title: 'THPTQG Countdown EX',
    summary:
      'Immersive countdown for the Vietnamese High School Graduation Exam with celebratory end states and reminders.',
    date: 'Apr 2025',
    categories: ['Minimal App', 'Web Development'],
    languages: ['React', 'Next.js', 'TailwindCSS', 'TypeScript'],
    link: 'https://project.sabicoder.xyz/',
    image: '/projects/thptqg-countdown.svg',
    featured: true,
    demoImages: ['/projects/thptqg-countdown.svg'],
  },
  {
    id: 'animated-404',
    title: 'Animated 404 Page',
    summary:
      'Playful 404 experience blending fluid gradients, micro-interactions, and accessible semantics.',
    date: 'Feb 2025',
    categories: ['Web Development', 'Minimal App'],
    languages: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/trahoangdev/404-animation',
    image: '/projects/animated-404.svg',
    featured: false,
    demoImages: [],
  },*/
];
