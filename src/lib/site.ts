// Public identity of this portfolio, shared by metadata, feeds and structured data.
// Keep independent of deployment URLs and legacy environment overrides.
export const SITE_URL = 'https://www.trahoangdev.me';

export function absoluteSiteUrl(path: string = '/'): string {
  return new URL(path, SITE_URL).href;
}
