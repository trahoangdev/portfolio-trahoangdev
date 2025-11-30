/**
 * Skip link component for accessibility
 * Allows keyboard users to skip navigation and jump to main content
 */

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded focus:outline-none focus:ring-2 focus:ring-ring"
    >
      Skip to main content
    </a>
  );
}
