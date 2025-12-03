export interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    year: 'Oct.2025 PRESENT',
    role: 'FRONTEND DEVLOPER',
    company: 'TAIKHOANXIN',
    description: 'Website providing the best service accounts',
    tech: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
  },
  {
    year: 'Sep.2025 Dec.2025',
    role: 'FRONTEND DEVLOPER',
    company: 'LUXWEAR AI',
    description:
      'LUXWEAR - AI AGENT SALES CONSULTANT (PLATFORM)',
    tech: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
  },
  {
    year: 'Nov.2025',
    role: 'EXTENSION DEVLOPER',
    company: 'Auto Fill Quiz Extension - AI Powered',
    description:
      'Chrome/Edge extension automatically fills quiz answers with AI Gemini - Simple, fast, smart',
    tech: ['Html', 'Css', 'js'],
  },
  {
    year: '2022 - 2025',
    role: 'WEB DEVELOPER',
    company: 'Learning',
    //description: 'learning web development and other related stuff',
    description: '',
    tech: ['Html', 'Css', 'js'],
  },
  {
    year: 'Oct.2022 PRESENT',
    role: 'STUDENT',
    company: 'HUTECH UNIVERSITY',
    //description: 'I was able to learn some basic programming knowledge and create a game projects',
    description: '',
    tech: ['Next.js','Node.js'],
  },
];
