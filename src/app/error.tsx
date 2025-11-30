'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error boundary caught:', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-2xl w-full space-y-8">
        <div className="border-dotted-thick border-border p-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold uppercase tracking-tight">
              Something went wrong
            </h1>
            <p className="text-muted-foreground">
              An unexpected error occurred. Don&apos;t worry, we&apos;re on it.
            </p>
          </div>

          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="border border-destructive/50 bg-destructive/10 p-4 rounded">
              <p className="text-sm font-mono text-destructive">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={reset}
              className="px-6 py-3 border-dotted-thick border-border bg-background hover:bg-foreground hover:text-background transition-all duration-300 hover-lift"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-6 py-3 border-dotted-thick border-border bg-background hover:bg-foreground hover:text-background transition-all duration-300 hover-lift"
            >
              Go home
            </Link>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            If this problem persists, please{' '}
            <Link href="/#service" className="underline hover:text-foreground">
              contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
