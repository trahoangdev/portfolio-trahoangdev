'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { getUserFriendlyErrorMessage, logError } from '@/lib/utils/error-boundary';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error with context
    logError(error, {
      digest: error.digest,
      page: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
    });
  }, [error]);

  const friendlyMessage = getUserFriendlyErrorMessage(error);

  return (
    <div className="min-h-screen text-foreground flex items-center justify-center px-6">
      <div className="max-w-2xl w-full space-y-8">
        <div className="border-dotted-thick border-border p-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold uppercase tracking-tight">
              Something went wrong
            </h1>
            <p className="text-muted-foreground">
              {friendlyMessage}
            </p>
          </div>

          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="border border-destructive/50 bg-destructive/10 p-4 rounded">
              <p className="text-sm font-mono text-destructive">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={reset}
              className="px-6 py-3 border-dotted-thick border-border bg-background hover:bg-foreground hover:text-background transition-all duration-300 hover-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
              aria-label="Try loading the page again"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-6 py-3 border-dotted-thick border-border bg-background hover:bg-foreground hover:text-background transition-all duration-300 hover-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded text-center"
              aria-label="Navigate to home page"
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
