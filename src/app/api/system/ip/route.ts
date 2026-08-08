import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export function GET(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ipAddress =
    forwardedFor?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'Unavailable';

  return NextResponse.json(
    { ip: ipAddress },
    { headers: { 'Cache-Control': 'private, no-store, max-age=0' } }
  );
}
