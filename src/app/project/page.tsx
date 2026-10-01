import { createPageMetadata } from '@/lib/metadata';
import { ProjectExplorer } from '@/features/projects/module/presentation/ProjectExplorer';

export const metadata = createPageMetadata({
  title: 'Project Hypergrid',
  description:
    'Dive into the full matrix of trahoangdev projects, filter by stack or mission, and explore the supporting tool arsenal.',
  path: '/project',
  // This route has its own opengraph-image.tsx; skip the site-wide default
  // so Next.js resolves that file instead of this overriding it.
  image: null,
});

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export default function ProjectPage() {
  return (
    <div className="min-h-screen text-foreground">
      <main id="main-content" tabIndex={-1} className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 pt-28 pb-16 sm:pb-20 lg:pb-24">
        <ProjectExplorer />
      </main>
    </div>
  );
}
