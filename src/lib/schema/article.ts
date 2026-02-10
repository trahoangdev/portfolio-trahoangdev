/**
 * Article Schema (Schema.org)
 * Structured data for blog posts
 */

export interface ArticleSchema {
  '@context': string;
  '@type': string;
  headline: string;
  description?: string;
  image?: string[];
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': string;
    name: string;
    url?: string;
  };
  publisher: {
    '@type': string;
    name: string;
    logo?: {
      '@type': string;
      url: string;
    };
  };
  mainEntityOfPage: {
    '@type': string;
    '@id': string;
  };
}

export interface ArticleSchemaProps {
  title: string;
  description?: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  slug: string;
  author?: string;
}

export function getArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  slug,
  author = 'Hoàng Trọng Trà',
}: ArticleSchemaProps): ArticleSchema {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.trahoangdev.me';
  const url = `${baseUrl}/blog/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description || title,
    image: image ? [`${baseUrl}${image}`] : [`${baseUrl}/og-image.png`],
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'trahoangdev',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.ico`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}
