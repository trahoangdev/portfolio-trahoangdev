'use client';

import { useEffect } from 'react';
import { logError } from '@/lib/utils/error-boundary';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    logError(error, { digest: error.digest });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main id="main-content" tabIndex={-1} className="flex min-h-screen items-center justify-center p-6">
          <div className="max-w-md space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold">500</h1>
              <p className="text-lg text-muted-foreground">
                Internal Server Error
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Please try again. If the problem persists, contact us through
              the portfolio.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="border-dotted-thick border-border px-6 py-3 text-sm uppercase tracking-[0.3em] transition-interface duration-300 hover:-translate-y-1 hover:bg-foreground hover:text-background"
            >
              Try Again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
