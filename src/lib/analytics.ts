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
