'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center p-6">
          <div className="max-w-md space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">500</h1>
              <p className="text-lg text-muted-foreground">
                Internal Server Error
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              We've been notified and are working on a fix. Please try again
              later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="border-dotted-thick border-border px-6 py-3 text-sm uppercase tracking-[0.3em] transition-all duration-300 hover:-translate-y-1 hover:bg-foreground hover:text-background"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
