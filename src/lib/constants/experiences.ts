export interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    year: 'Oct.2025 Present',
    role: 'Fullstack Developer',
    company: 'TAIKHOANXIN',
    description: '',
    //description: 'create a few projects and share to the world',
    tech: ['React', 'TypeScript', 'Next.js', 'TailwindCSS'],
  },
  /*{
    year: 'Sep.2025 Present',
    role: 'Provincial gifted student competition',
    company: 'DSA Learning',
    description:
      'Preparing to compete in the provincial gifted student contest in Vietnam, which evaluates advanced algorithmic knowledge and problem-solving ability.',
    tech: ['C++', 'Python'],
  },*/
  {
    year: '2024 - 2025',
    role: 'Basic Web development',
    company: 'Learning',
    //description: 'learning web development and other related stuff',
    description: '',
    tech: ['Html', 'Css', 'js', 'Node.js'],
  },
  {
    year: 'Oct.2022 Present',
    role: 'STUDENT',
    company: 'HUTECH UNIVERSITY',
    //description: 'I was able to learn some basic programming knowledge and create a game projects',
    description: '',
    tech: ['Next.js','Node.js'],
  },
];
