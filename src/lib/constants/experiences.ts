export interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    year: 'Dec.2025 PRESENT',
    role: 'FRONTEND DEVELOPER',
    company: 'Founder at DevOrbit',
    description: 'Develop a personal blog to share in - depth knowledge about Backend and System Design. Focus on content quality and reader experience.',
    //tech: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Markdown'],
    tech: [],
  },
  {
    year: 'Oct.2025 PRESENT',
    role: 'FRONTEND DEVELOPER',
    company: 'Co-Founder at TAIKHOANXIN.COM',
    description: 'A premier marketplace for digital access. Connecting users with top-tier service accounts through a seamless, automated platform. Quality, reliability, and speed—delivered.',
    //tech: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
    tech: [],
  },
  {
    year: 'Oct.2025 Dec.2025',
    role: 'FRONTEND DEVELOPER',
    company: 'Co-Founder at LUXWEAR AI',
    description:
      'SaaS platforms enable businesses to build, deploy, and manage AI agents. The system supports real-time data integration, performs actions across third-party systems, and provides detailed analytical reporting.',
    //tech: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
    tech: [],
  },

  {
    year: '2022 - 2025',
    role: 'WEB DEVELOPER',
    company: 'LEARNING WEBSITE DEVELOPMENT',
    description: 'The self-taught grind. Deep diving into the web ecosystem, exploring modern frameworks, and turning curiosity into capability. Building, breaking, and refactoring—the endless cycle of growth.',
    //tech: ['Html', 'Css', 'js', 'TailwindCSS', 'Next.js', 'Node.js', 'React', 'TypeScript', 'Vite', 'Git', 'GitHub', 'Figma'],
    tech: [],
  },
  {
    year: '2022 - 2026',
    role: 'SENIOR STUDENT',
    company: 'HUTECH UNIVERSITY',
    description: 'Majoring in Software Engineering. Consuming knowledge, compiling experience, and shipping code. Bridging the gap between theory and reality, one commit at a time.',
    tech: [],
  },
];
