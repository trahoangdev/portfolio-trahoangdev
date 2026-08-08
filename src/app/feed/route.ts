import { NextRequest, NextResponse } from 'next/server';

/**
 * RSS Feed endpoint
 * Alternative route for /feed.xml
 */
export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL('/feed.xml', request.url), 308);
}
