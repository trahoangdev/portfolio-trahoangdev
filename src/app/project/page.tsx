import type { Metadata } from 'next';
import { ProjectExplorer } from '@/features/projects/module/presentation/ProjectExplorer';

export const metadata: Metadata = {
  title: 'Project Hypergrid',
  description:
    'Dive into the full matrix of trahoangdev projects, filter by stack or mission, and explore the supporting tool arsenal.',
};

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export default function ProjectPage() {
  return (
    <div className="min-h-screen text-foreground">
      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 pt-28 pb-16 sm:pb-20 lg:pb-24">
        <ProjectExplorer />
      </main>
    </div>
  );
}
