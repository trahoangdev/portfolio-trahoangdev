import type { Metadata } from 'next';

import { HonorsAwardsShowcase } from '@/features/honors/components/HonorsAwardsShowcase';

export const metadata: Metadata = {
  title: 'Honors & Awards',
  description:
    'Verified honors, awards, academy recognitions, and technical achievements from Tra Hoang Trong.',
};

export default function HonorsAwardsPage() {
  return (
    <main className="min-h-screen px-4 pb-16 pt-28 text-foreground sm:px-8 sm:pb-20 lg:px-16 lg:pb-24">
      <div className="mx-auto max-w-6xl">
        <HonorsAwardsShowcase />
      </div>
    </main>
  );
}
