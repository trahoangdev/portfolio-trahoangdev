/**
 * Enhanced analytics utilities
 * Extends the base analytics with performance and user behavior tracking
 */

import { trackEvent } from './analytics';

/**
 * Track page view with performance metrics
 */
export function trackPageView(path: string, performance?: {
  loadTime?: number;
  renderTime?: number;
}) {
  trackEvent('page_view', {
    path,
    ...(performance && { performance }),
  });
}

/**
 * Track user engagement metrics
 */
export function trackEngagement(action: string, details?: Record<string, any>) {
  trackEvent('engagement', {
    action,
    timestamp: Date.now(),
    ...details,
  });
}

/**
 * Track performance metrics
 */
export function trackPerformance(metrics: {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
}) {
  trackEvent('performance', {
    ...metrics,
    timestamp: Date.now(),
  });
}

/**
 * Track error with context
 */
export function trackError(error: Error, context?: Record<string, any>) {
  trackEvent('error', {
    message: error.message,
    stack: error.stack,
    ...context,
    timestamp: Date.now(),
  });
}

/**
 * Track component interaction
 */
export function trackInteraction(component: string, action: string, details?: Record<string, any>) {
  trackEvent('interaction', {
    component,
    action,
    ...details,
    timestamp: Date.now(),
  });
}
