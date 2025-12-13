import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const ProjectExplorer = dynamic(
  () => import('@/modules/projects/presentation/ProjectExplorer').then((mod) => ({ default: mod.ProjectExplorer })),
  {
    loading: () => (
      <div className="space-y-8">
        <div className="h-14 w-3/4 rounded-2xl bg-muted/40 animate-pulse" />
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-64 rounded-2xl bg-muted/30 animate-pulse" />
          ))}
        </div>
      </div>
    ),
    ssr: true,
  }
);

export const metadata: Metadata = {
  title: 'Project Hypergrid </> trahoangdev',
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
