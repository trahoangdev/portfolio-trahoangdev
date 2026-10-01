import { HomePageClient } from '@/components/home/HomePageClient';
import { getAllPosts } from '@/features/blog/module/service';
import { SITE_URL, absoluteSiteUrl } from '@/lib/site';

export const metadata = {
  alternates: {
    canonical: SITE_URL,
    types: { 'application/rss+xml': absoluteSiteUrl('/feed.xml') },
  },
};

export default function Home() {
  return <HomePageClient latestPosts={getAllPosts().slice(0, 3)} />;
}
