/** @jest-environment node */
import { createPageMetadata } from '@/lib/metadata';
import { SITE_URL } from '@/lib/site';
import { getArticleSchema } from '@/lib/schema/article';
import { getPersonSchema } from '@/lib/schema/person';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import { GET as feed } from '@/app/feed.xml/route';

jest.mock('@/features/blog/module/service', () => ({
  getAllPosts: () => [{ slug: 'test-post', title: 'Test post', excerpt: 'Summary', date: '2026-09-07', author: 'Author', tags: ['TypeScript'] }],
}));

describe('Canonical site identity', () => {
  const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  beforeEach(() => { process.env.NEXT_PUBLIC_SITE_URL = 'https://portfolio-trahoangdev.vercel.app'; });
  afterEach(() => {
    if (originalSiteUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
  });

  it('keeps sitemap, robots, RSS and structured data on the public domain despite legacy env', async () => {
    expect(sitemap().every(entry => entry.url.startsWith(SITE_URL))).toBe(true);
    expect(robots().sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    const xml = await (await feed()).text();
    expect(xml).toContain(`${SITE_URL}/blog/test-post`);
    expect(xml).not.toContain('vercel.app');
    expect(getPersonSchema().url).toBe(SITE_URL);
  });

  it('provides a post-specific canonical and social preview', () => {
    const metadata = createPageMetadata({
      title: 'Test post', description: 'Summary', path: '/blog/test-post', image: '/portrait.jpg',
      article: { publishedTime: '2026-09-07', author: 'Author', tags: ['TypeScript'] },
    });
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/blog/test-post`);
    expect(metadata.openGraph).toEqual(expect.objectContaining({
      type: 'article', title: 'Test post', url: `${SITE_URL}/blog/test-post`, publishedTime: '2026-09-07',
      images: [{ url: `${SITE_URL}/portrait.jpg`, alt: 'Test post' }],
    }));
    expect(metadata.twitter).toEqual(expect.objectContaining({ title: 'Test post', description: 'Summary' }));
  });

  it('preserves absolute cover image URLs in article structured data', () => {
    expect(getArticleSchema({ title: 'Post', slug: 'post', datePublished: '2026-09-07', image: 'https://example.com/cover.jpg' }).image)
      .toEqual(['https://example.com/cover.jpg']);
  });
});
