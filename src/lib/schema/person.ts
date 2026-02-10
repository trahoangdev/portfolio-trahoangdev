/**
 * Person Schema (Schema.org)
 * Structured data for SEO and rich snippets
 */

export interface PersonSchema {
  '@context': string;
  '@type': string;
  name: string;
  jobTitle: string;
  url: string;
  sameAs: string[];
  image?: string;
  description?: string;
  knowsAbout?: string[];
  alumniOf?: {
    '@type': string;
    name: string;
  };
  worksFor?: {
    '@type': string;
    name: string;
  };
}

export function getPersonSchema(): PersonSchema {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.trahoangdev.me';

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Hoàng Trọng Trà',
    jobTitle: 'Software Engineer',
    url: baseUrl,
    sameAs: [
      'https://github.com/trahoangdev',
      'https://www.linkedin.com/in/trahoangdev',
      'https://www.trahoangdev.me',
    ],
    image: `${baseUrl}/portrait.jpg`,
    description:
      'Software Engineer specializing in building exceptional digital experiences. Focused on accessible, human-centered products.',
    knowsAbout: [
      'Web Development',
      'Frontend Development',
      'React',
      'Next.js',
      'TypeScript',
      'Software Engineering',
      'AI Engineering',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'University',
    },
  };
}
