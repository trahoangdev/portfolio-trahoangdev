// Public identity of this portfolio, shared by metadata, feeds and structured data.
// Keep independent of deployment URLs and legacy environment overrides.
const PRODUCTION_SITE_URL = 'https://www.trahoangdev.me';
export const SITE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : PRODUCTION_SITE_URL;

export function absoluteSiteUrl(path: string = '/'): string {
  return new URL(path, SITE_URL).href;
}
