'use client';

import React, { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Generic error boundary component for catching React errors
 * Use this for specific sections that need custom error handling
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught:', error, errorInfo);
    }

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="border-dotted-thick border-border p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Something went wrong</h3>
            <p className="text-sm text-muted-foreground">
              This section encountered an error. Please try refreshing the page.
            </p>
          </div>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="border border-destructive/50 bg-destructive/10 p-3 rounded">
              <p className="text-xs font-mono text-destructive">
                {this.state.error.message}
              </p>
            </div>
          )}

          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 text-sm border-dotted-thick border-border bg-background hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
