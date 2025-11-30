import type { Metadata } from 'next';

import { ProjectExplorer } from '@/modules/projects/presentation/ProjectExplorer';

export const metadata: Metadata = {
  title: 'Project Hypergrid | trahoangdev',
  description:
    'Dive into the full matrix of trahoangdev projects, filter by stack or mission, and explore the supporting tool arsenal.',
};

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 pt-28 pb-16 sm:pb-20 lg:pb-24">
        <ProjectExplorer />
      </main>
    </div>
  );
}
