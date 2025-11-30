'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ProjectError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Project page error:', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 pt-28 pb-16">
        <div className="space-y-8">
          <div className="border-dotted-thick border-border p-8 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold uppercase tracking-tight">
                Failed to load projects
              </h1>
              <p className="text-muted-foreground">
                We encountered an error while loading the project data. This could be due to:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                <li>Network connectivity issues</li>
                <li>GitHub API rate limiting</li>
                <li>Invalid configuration</li>
              </ul>
            </div>

            {process.env.NODE_ENV === 'development' && error.message && (
              <div className="border border-destructive/50 bg-destructive/10 p-4 rounded">
                <p className="text-xs font-mono text-destructive">
                  {error.message}
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={reset}
                className="px-6 py-3 border-dotted-thick border-border bg-background hover:bg-foreground hover:text-background transition-all duration-300 hover-lift"
              >
                Retry
              </button>
              <Link
                href="/"
                className="px-6 py-3 border-dotted-thick border-border bg-background hover:bg-foreground hover:text-background transition-all duration-300 hover-lift"
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
