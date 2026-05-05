import { NextRequest, NextResponse } from 'next/server';
import { getRedisCache } from '@/lib/cache/RedisCache';

const RATE_LIMIT_WINDOW_SECONDS = 60;
const MAX_REQUESTS_PER_WINDOW = 10;

export const runtime = 'edge';

const VISITOR_COUNT_KEY = 'visitor:count';
const RATE_LIMIT_PREFIX = 'visitor:rate-limit:';

/**
 * GET /api/visitor - Get current visitor count
 */
export async function GET() {
  try {
    const cache = getRedisCache();

    if (cache.isAvailable()) {
      const count = await cache.get<number>(VISITOR_COUNT_KEY);
      return NextResponse.json({ total: count || 0, available: true });
    }

    return NextResponse.json({ total: null, available: false });
  } catch (error) {
    console.error('Error getting visitor count:', error);
    return NextResponse.json({ total: null, available: false });
  }
}

/**
 * POST /api/visitor - Increment visitor count
 */
export async function POST(request: NextRequest) {
  try {
    const cache = getRedisCache();

    if (!cache.isAvailable()) {
      return NextResponse.json({ total: null, available: false });
    }

    const rawIp =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const ip = rawIp.split(',')[0].trim() || 'unknown';
    const rateLimitKey = `${RATE_LIMIT_PREFIX}${ip}`;
    const requestCount = await cache.increment(rateLimitKey);

    if (requestCount === null) {
      return NextResponse.json(
        { error: 'Visitor tracking unavailable', available: false },
        { status: 503 }
      );
    }

    if (requestCount === 1) {
      await cache.expire(rateLimitKey, RATE_LIMIT_WINDOW_SECONDS);
    }

    if (requestCount > MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { error: 'Too many requests', available: true },
        { status: 429 }
      );
    }

    const newCount = await cache.increment(VISITOR_COUNT_KEY);

    if (newCount === null) {
      return NextResponse.json(
        { error: 'Visitor tracking unavailable', available: false },
        { status: 503 }
      );
    }

    return NextResponse.json({ total: newCount, available: true });
  } catch (error) {
    console.error('Error processing visitor request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
