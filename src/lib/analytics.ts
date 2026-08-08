/**
 * Analytics utilities for tracking user interactions
 * Uses Vercel Analytics for event tracking
 */

import { track } from '@vercel/analytics';

/**
 * Track project card click
 */
export function trackProjectClick(projectId: string, projectName: string) {
  track('project_click', {
    projectId,
    projectName,
  });
}

/**
 * Track project filter usage
 */
export function trackFilterApplied(filterType: string, filterValue: string) {
  track('filter_applied', {
    filterType,
    filterValue,
  });
}

/**
 * Track theme change
 */
export function trackThemeChanged(theme: 'light' | 'dark' | 'system') {
  track('theme_changed', {
    theme,
  });
}

/**
 * Track navigation to section
 */
export function trackSectionNavigation(section: string) {
  track('section_navigation', {
    section,
  });
}

/**
 * Track external link click
 */
export function trackExternalLink(url: string, label: string) {
  track('external_link_click', {
    url,
    label,
  });
}

/**
 * Track social media link click
 */
export function trackSocialClick(platform: string) {
  track('social_click', {
    platform,
  });
}

/**
 * Track carousel interaction
 */
export function trackCarouselInteraction(action: 'next' | 'prev' | 'dot', index: number) {
  track('carousel_interaction', {
    action,
    index,
  });
}

/**
 * Track search/filter clear
 */
export function trackFilterCleared() {
  track('filter_cleared');
}

/**
 * Track page scroll depth
 */
export function trackScrollDepth(depth: number) {
  track('page_scroll_depth', {
    depth: `${depth}%`,
  });
}

/**
 * Track time on page
 */
export function trackTimeOnPage(seconds: number) {
  track('time_on_page', {
    seconds,
  });
}

/**
 * Track error occurred
 */
interface BrowserSentry {
  captureException: (error: Error, options?: { extra?: Record<string, unknown> }) => void;
}

type WindowWithSentry = Window & { Sentry?: BrowserSentry };

export function trackError(error: string | Error, context?: string | Record<string, unknown>) {
  const errorMessage = typeof error === 'string' ? error : error.message;
  const errorStack = typeof error === 'object' && error.stack ? error.stack.substring(0, 500) : undefined;
  
  track('error_occurred', {
    error: errorMessage,
    ...(errorStack && { stack: errorStack }),
    ...(context && (typeof context === 'string' ? { context } : context)),
  });

  // Also send to Sentry if available
  const sentry = typeof window !== 'undefined'
    ? (window as WindowWithSentry).Sentry
    : undefined;
  if (sentry) {
    const sentryContext = typeof context === 'string' ? { context } : context;
    sentry.captureException(
      typeof error === 'string' ? new Error(error) : error,
      { extra: sentryContext }
    );
  }
}

/**
 * Track page view with custom data
 */
export function trackPageView(page: string, data?: Record<string, string>) {
  track('page_view', {
    page,
    ...data,
  });
}
