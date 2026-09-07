import type { Metadata } from 'next';
import { absoluteSiteUrl } from './site';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  article?: { publishedTime: string; author: string; tags?: string[] };
}

export function createPageMetadata({
  title,
  description,
  path,
  image = '/opengraph-image',
  article,
}: PageMetadataOptions): Metadata {
  const url = absoluteSiteUrl(path);
  const imageUrl = absoluteSiteUrl(image);

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
      images: [{ url: imageUrl, alt: title }],
      ...(article
        ? { type: 'article', publishedTime: article.publishedTime, authors: [article.author], tags: article.tags }
        : { type: 'website' }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@trahoangdev',
    },
  };
}
