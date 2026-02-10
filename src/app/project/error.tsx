'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { getUserFriendlyErrorMessage, logError } from '@/lib/utils/error-boundary';

export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logError(error, {
      digest: error.digest,
      page: '/project',
    });
  }, [error]);

  const friendlyMessage = getUserFriendlyErrorMessage(error);

  return (
    <div className="min-h-screen text-foreground">
      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 pt-28 pb-16">
        <div className="space-y-8">
          <div className="border-dotted-thick border-border p-8 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold uppercase tracking-tight">
                Failed to load projects
              </h1>
            <p className="text-muted-foreground">
              {friendlyMessage}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              This could be due to network issues, API rate limiting, or configuration problems.
            </p>
            </div>

            {process.env.NODE_ENV === 'development' && error.message && (
              <div className="border border-destructive/50 bg-destructive/10 p-4 rounded">
                <p className="text-xs font-mono text-destructive">
                  {error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={reset}
                className="px-6 py-3 border-dotted-thick border-border bg-background hover:bg-foreground hover:text-background transition-all duration-300 hover-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                aria-label="Retry loading projects"
              >
                Retry
              </button>
              <Link
                href="/"
                className="px-6 py-3 border-dotted-thick border-border bg-background hover:bg-foreground hover:text-background transition-all duration-300 hover-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded text-center"
                aria-label="Navigate to home page"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
