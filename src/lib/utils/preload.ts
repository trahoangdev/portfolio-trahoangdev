/**
 * Resource preloading utilities
 */

/**
 * Preload critical images
 */
export function preloadImages(urls: string[]): void {
  if (typeof document === 'undefined') {
    return;
  }

  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'image';
    document.head.appendChild(link);
  });
}

/**
 * Preload fonts
 */
export function preloadFonts(fonts: Array<{ url: string; type: string }>): void {
  if (typeof document === 'undefined') {
    return;
  }

  fonts.forEach((font) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = font.url;
    link.as = 'font';
    link.type = font.type;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Preload critical routes
 */
export function preloadRoute(href: string): void {
  if (typeof document === 'undefined') {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Initialize critical resource preloading
 */
export function initPreloading(): void {
  if (typeof window === 'undefined') {
    return;
  }

  // Preload critical images
  preloadImages([
    '/portrait.jpg',
    '/projects/taikhoanxin.png',
    '/og-image.png',
  ]);

  // Preload critical routes on hover
  const criticalRoutes = ['/project', '/blog', '/experience'];
  
  criticalRoutes.forEach((route) => {
    const links = document.querySelectorAll(`a[href="${route}"]`);
    links.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        preloadRoute(route);
      }, { once: true });
    });
  });
}
