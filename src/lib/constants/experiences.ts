export interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
}

export const EXPERIENCES: Experience[] = [
  // {
  //   year: `PRESENT`,
  //   role: 'FREELANCER',
  //   company: 'Self-Employed',
  //   description: 'Working on personal projects and learning new technologies.',
  //   //tech: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
  //   tech: [],
  // },
  {
    year: 'Apr. 2026 PRESENT',
    role: 'CLOUD ENGINEER INTERN',
    company: 'AWS VIETNAM',
    description: 'Selected for the First Cloud AI Journey (FCAJ) Workforce Bootcamp supported by AWS. Gaining hands-on experience in AWS Cloud fundamentals, DevOps practices, Data Engineering, and building scalable AI/ML solutions through real-world labs and expert mentorship.',
    //tech: [],
    tech: ['AWS', 'Cloud Architecture', 'AI/ML', 'DevOps', 'Data Engineering'],
  },
  {
    year: 'Oct.2025 Mar.2026',
    role: 'FRONTEND DEVELOPER',
    company: 'Co-Founder at TAIKHOANXIN.COM',
    description: 'A premier marketplace for digital access. Connecting users with top-tier service accounts through a seamless, automated platform. Quality, reliability, and speed—delivered.',
    tech: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
    //tech: [],
  },
  // {
  //   year: 'Oct.2025 Dec.2025',
  //   role: 'FRONTEND DEVELOPER',
  //   company: 'Founder at DevOrbit',
  //   description: 'Develop a personal blog to share in - depth knowledge about Backend and System Design. Focus on content quality and reader experience.',
  //   //tech: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Markdown'],
  //   tech: [],
  // },
  {
    year: 'Oct.2025 Mar.2025',
    role: 'FRONTEND DEVELOPER',
    company: 'Co-Founder at LUXEWEAR AI',
    description:
      'SaaS platforms enable businesses to build, deploy, and manage AI agents. The system supports real-time data integration, performs actions across third-party systems, and provides detailed analytical reporting.',
    tech: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
    //tech: [],
  },

  {
    year: '2024 - 2025',
    role: 'LEARNING AI AGENT & AUTOMATION',
    company: 'AI AGENT & AUTOMATION',
    description: 'Spearheaded independent research and implementation in Artificial Intelligence with a strong focus on Agentic AI and Workflow Automation. Mastered the architecture of autonomous agents, advanced RAG systems, and leveraging LLMs to execute complex decision-making and automated pipelines.',
    tech: ['Python', 'PyTorch', 'TensorFlow', 'LangChain', 'OpenAI API', 'Hugging Face', 'NLP', 'Computer Vision'],
    //tech: [],
  },

  {
    year: '2023',
    role: 'WEB DEVELOPER',
    company: 'LEARNING WEBSITE DEVELOPMENT',
    description: 'The self-taught grind. Deep diving into the web ecosystem, exploring modern frameworks, and turning curiosity into capability. Building, breaking, and refactoring—the endless cycle of growth.',
    tech: ['Html', 'Css', 'js'],
    //tech: [],
  },
  {
    year: '2022 - 2026',
    role: 'SENIOR STUDENT',
    company: 'HUTECH - UNIVERSITY OF TECHNOLOGY',
    description: 'Majoring in Software Engineering. Consuming knowledge, compiling experience, and shipping code. Bridging the gap between theory and reality, one commit at a time.',
    tech: [],
  },
];
