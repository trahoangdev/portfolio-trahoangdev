/**
 * Error boundary utilities
 */

/**
 * Check if error is recoverable
 */
export function isRecoverableError(error: Error): boolean {
  // Network errors are usually recoverable
  if (error.message.includes('network') || error.message.includes('fetch')) {
    return true;
  }

  // Timeout errors are recoverable
  if (error.message.includes('timeout')) {
    return true;
  }

  // Rate limiting errors are recoverable
  if (error.message.includes('rate limit') || error.message.includes('429')) {
    return true;
  }

  // Syntax errors are not recoverable
  if (error.message.includes('syntax') || error.message.includes('parse')) {
    return false;
  }

  // Default: assume recoverable
  return true;
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyErrorMessage(error: Error): string {
  if (error.message.includes('network') || error.message.includes('fetch')) {
    return 'Network connection issue. Please check your internet connection and try again.';
  }

  if (error.message.includes('timeout')) {
    return 'Request timed out. Please try again.';
  }

  if (error.message.includes('rate limit') || error.message.includes('429')) {
    return 'Too many requests. Please wait a moment and try again.';
  }

  if (error.message.includes('404') || error.message.includes('not found')) {
    return 'The requested resource was not found.';
  }

  if (error.message.includes('500') || error.message.includes('server')) {
    return 'Server error occurred. Please try again later.';
  }

  return 'An unexpected error occurred. Please try again.';
}

/**
 * Log error with context
 */
export function logError(error: Error, context?: Record<string, any>): void {
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error, context);
  }

  // Send to Sentry if available
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureException(error, {
      extra: context,
    });
  }
}
