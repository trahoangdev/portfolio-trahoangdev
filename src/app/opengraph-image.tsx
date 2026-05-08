import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const alt = 'Tra Hoang Trong (Hoàng Trọng Trà) (trahoangdev) - Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const filePath = path.join(process.cwd(), 'public', 'og-image.png');
  const buffer = await readFile(filePath);
  const body = new Uint8Array(buffer);

  return new Response(body, {
    headers: {
      'Content-Type': contentType,
      // Cache aggressively (CDN) but allow periodic refresh
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
