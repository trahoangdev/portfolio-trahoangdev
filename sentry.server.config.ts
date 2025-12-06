import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Environment
  environment: process.env.NODE_ENV,

  // Ignore common errors
  ignoreErrors: [
    'ECONNREFUSED',
    'ETIMEDOUT',
    'ENOTFOUND',
  ],

  beforeSend(event, hint) {
    // Filter out non-error events in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Sentry Server Event:', event);
      return null; // Don't send to Sentry in development
    }
    return event;
  },
});
