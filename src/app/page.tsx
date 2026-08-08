import { HomePageClient } from '@/components/home/HomePageClient';
import { getAllPosts } from '@/features/blog/module/service';

export default function Home() {
  return <HomePageClient latestPosts={getAllPosts().slice(0, 3)} />;
}
