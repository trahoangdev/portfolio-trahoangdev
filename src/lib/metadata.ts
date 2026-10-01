import type { Metadata } from 'next';
import { absoluteSiteUrl } from './site';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  /**
   * Custom OG image path/URL. Omit to use the site-wide default (matches the
   * root layout's og:image, including its width/height). Pass `null` to skip
   * setting an image entirely so Next.js resolves this route's own
   * opengraph-image file convention instead (e.g. /project).
   */
  image?: string | null;
  article?: { publishedTime: string; author: string; tags?: string[] };
}

const DEFAULT_IMAGE_PATH = '/opengraph-image';
const DEFAULT_IMAGE_SIZE = { width: 1200, height: 630 };

export function createPageMetadata({
  title,
  description,
  path,
  image,
  article,
}: PageMetadataOptions): Metadata {
  const url = absoluteSiteUrl(path);
  const usesDefaultImage = image === undefined;
  const imageUrl = image === null ? undefined : absoluteSiteUrl(image ?? DEFAULT_IMAGE_PATH);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      types: { 'application/rss+xml': absoluteSiteUrl('/feed.xml') },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'trahoangdev',
      locale: 'en_US',
      ...(imageUrl
        ? { images: [{ url: imageUrl, alt: title, ...(usesDefaultImage ? DEFAULT_IMAGE_SIZE : {}) }] }
        : {}),
      ...(article
        ? { type: 'article', publishedTime: article.publishedTime, authors: [article.author], tags: article.tags }
        : { type: 'website' }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
      creator: '@trahoangdev',
    },
  };
}
