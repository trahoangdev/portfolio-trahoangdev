/**
 * Image utility functions for performance optimization
 */

/**
 * Generate a blur data URL for image placeholders
 * This creates a tiny 1x1 pixel image encoded as base64
 */
export function generateBlurDataURL(width = 1, height = 1): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    // Fallback: return a simple gray pixel
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=';
  }
  
  // Create a simple gray placeholder
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL();
}

/**
 * Preload critical images
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Check if image is cached
 */
export function isImageCached(src: string): boolean {
  const img = new Image();
  img.src = src;
  return img.complete && img.naturalWidth > 0;
}
