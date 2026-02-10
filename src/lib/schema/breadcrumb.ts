/**
 * BreadcrumbList Schema (Schema.org)
 * Structured data for navigation breadcrumbs
 */

export interface BreadcrumbItem {
  '@type': string;
  position: number;
  name: string;
  item?: string;
}

export interface BreadcrumbListSchema {
  '@context': string;
  '@type': string;
  itemListElement: BreadcrumbItem[];
}

export interface BreadcrumbItemProps {
  name: string;
  url?: string;
}

export function getBreadcrumbSchema(
  items: BreadcrumbItemProps[]
): BreadcrumbListSchema {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.trahoangdev.me';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}` }),
    })),
  };
}
