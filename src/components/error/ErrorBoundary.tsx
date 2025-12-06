'use client';

import * as Sentry from '@sentry/nextjs';
import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to Sentry
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });

    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-screen items-center justify-center p-6">
            <div className="max-w-md space-y-6 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold">Oops!</h1>
                <p className="text-lg text-muted-foreground">
                  Something went wrong
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                We've been notified and are working on a fix. Please try
                refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="border-dotted-thick border-border px-6 py-3 text-sm uppercase tracking-[0.3em] transition-all duration-300 hover:-translate-y-1 hover:bg-foreground hover:text-background"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
