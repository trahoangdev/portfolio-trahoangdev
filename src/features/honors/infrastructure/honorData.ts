export interface HonorAward {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'Academy' | 'Competition' | 'Professional' | 'Technical';
  summary: string;
  impact: string;
  credentialUrl?: string;
  skills: string[];
}

export const HONORS_AWARDS: HonorAward[] = [
  {
    id: 'valsea-edtech-system-sprint-top-3',
    title: 'Top 3 Winners - VALSEA EdTech System Sprint (HCM)',
    issuer: 'VALSEA',
    date: 'May 2026',
    category: 'Competition',
    summary:
      'Recognized as Top 3 winner in the VALSEA EdTech System Sprint (HCM), a system-building sprint focused on AI solutions for real EdTech problems.',
    impact:
      'Validated the ability to move from product problem to working AI system under sprint constraints, with Tra Hoang Trong listed as Top 3 in the official Devpost update.',
    credentialUrl: 'https://valsea-edtech-system-sprint.devpost.com/updates',
    skills: ['AI Systems', 'EdTech', 'Product Engineering', 'Rapid Prototyping'],
  },
  {
    id: 'aws-academy-cloud-security-foundations',
    title: 'AWS Academy Graduate - Cloud Security Foundations',
    issuer: 'AWS Academy',
    date: '2025',
    category: 'Academy',
    summary:
      'Completed a focused cloud security curriculum covering risk-aware architecture, compliance thinking, and security controls in AWS environments.',
    impact:
      'Strengthened the foundation for building cloud-native applications with security requirements considered from the design stage.',
    credentialUrl:
      'https://www.credly.com/badges/7847003f-5dda-43ff-9de2-7f5e92f65339/public_url',
    skills: ['AWS', 'Cloud Security', 'Risk Management', 'Compliance'],
  },
  {
    id: 'javascript-essentials-2',
    title: 'JavaScript Essentials 2',
    issuer: 'Cisco',
    date: '2025',
    category: 'Technical',
    summary:
      'Earned recognition for intermediate JavaScript knowledge including object-oriented patterns, asynchronous programming, and browser APIs.',
    impact:
      'Validated the language fundamentals used across frontend projects, Next.js interfaces, and client-side product interactions.',
    credentialUrl:
      'https://www.credly.com/badges/f5c59681-9898-4590-9393-7010bf8df381/public_url',
    skills: ['JavaScript', 'OOP', 'Async Programming', 'DOM'],
  },
  {
    id: 'networking-basics',
    title: 'Networking Basics',
    issuer: 'Cisco',
    date: '2025',
    category: 'Professional',
    summary:
      'Completed foundational networking training across TCP/IP, common protocols, network models, and security-oriented infrastructure concepts.',
    impact:
      'Improved system-level reasoning for deploying, debugging, and securing web applications beyond the UI layer.',
    credentialUrl:
      'https://www.credly.com/badges/33f3b395-12cd-42aa-a6f3-4d03ff4c8300/public_url',
    skills: ['TCP/IP', 'OSI Model', 'Protocols', 'Network Security'],
  },
];
