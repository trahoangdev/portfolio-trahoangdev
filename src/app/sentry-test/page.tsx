'use client';

import * as Sentry from '@sentry/nextjs';

export default function SentryTestPage() {
  const testClientError = () => {
    try {
      throw new Error('Test Client Error - Sentry is working!');
    } catch (error) {
      Sentry.captureException(error);
      console.log('Error sent to Sentry:', error);
    }
  };

  const testUncaughtError = () => {
    // This will be caught by Sentry automatically
    throw new Error('Test Uncaught Error - This should appear in Sentry!');
  };

  const testMessage = () => {
    Sentry.captureMessage('Test message from Sentry test page', 'info');
    console.log('Message sent to Sentry');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">Sentry Test Page</h1>
          <p className="text-muted-foreground">
            Test Sentry error tracking integration
          </p>
        </div>

        <div className="space-y-4">
          <div className="border border-border p-6 space-y-4">
            <h2 className="text-xl font-semibold">Test 1: Caught Error</h2>
            <p className="text-sm text-muted-foreground">
              This will send a caught error to Sentry
            </p>
            <button
              onClick={testClientError}
              className="border-dotted-thick border-border px-6 py-3 text-sm uppercase tracking-[0.3em] transition-all duration-300 hover:-translate-y-1 hover:bg-foreground hover:text-background"
            >
              Test Caught Error
            </button>
          </div>

          <div className="border border-border p-6 space-y-4">
            <h2 className="text-xl font-semibold">Test 2: Uncaught Error</h2>
            <p className="text-sm text-muted-foreground">
              This will throw an uncaught error (will show error boundary)
            </p>
            <button
              onClick={testUncaughtError}
              className="border-dotted-thick border-border px-6 py-3 text-sm uppercase tracking-[0.3em] transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:text-white"
            >
              Test Uncaught Error
            </button>
          </div>

          <div className="border border-border p-6 space-y-4">
            <h2 className="text-xl font-semibold">Test 3: Message</h2>
            <p className="text-sm text-muted-foreground">
              This will send a message to Sentry
            </p>
            <button
              onClick={testMessage}
              className="border-dotted-thick border-border px-6 py-3 text-sm uppercase tracking-[0.3em] transition-all duration-300 hover:-translate-y-1 hover:bg-foreground hover:text-background"
            >
              Test Message
            </button>
          </div>
        </div>

        <div className="border border-border p-6 space-y-4">
          <h3 className="font-semibold">How to verify:</h3>
          <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
            <li>Click any test button above</li>
            <li>Check browser console for confirmation</li>
            <li>Go to Sentry dashboard: https://sentry.io</li>
            <li>Navigate to Issues</li>
            <li>You should see the test error/message</li>
          </ol>
        </div>

        <div className="text-center">
          <a
            href="/"
            className="inline-block border-dotted-thick border-border px-6 py-3 text-sm uppercase tracking-[0.3em] transition-all duration-300 hover:-translate-y-1 hover:bg-foreground hover:text-background"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
