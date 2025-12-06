import { NextRequest, NextResponse } from 'next/server';
import { sanitizeString } from '@/lib/validation';
import { getRedisCache } from '@/infrastructure/cache/RedisCache';

// Rate limiting: Track IPs and their last request time
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

export const runtime = 'edge';

const VISITOR_COUNT_KEY = 'visitor:count';

/**
 * GET /api/visitor - Get current visitor count
 */
export async function GET() {
  try {
    const cache = getRedisCache();
    
    if (cache.isAvailable()) {
      const count = await cache.get<number>(VISITOR_COUNT_KEY);
      return NextResponse.json({ total: count || 0 });
    }
    
    // Fallback if Redis not available
    return NextResponse.json({ total: 0 });
  } catch (error) {
    console.error('Error getting visitor count:', error);
    return NextResponse.json({ total: 0 });
  }
}

/**
 * POST /api/visitor - Increment visitor count
 */
export async function POST(request: NextRequest) {
  try {
    // Get and sanitize IP address
    const rawIp = request.headers.get('x-forwarded-for') || 
                  request.headers.get('x-real-ip') || 
                  'unknown';
    const ip = sanitizeString(rawIp.split(',')[0].trim());

    // Rate limiting check
    const now = Date.now();
    const lastRequestTime = rateLimitMap.get(ip) || 0;
    
    if (now - lastRequestTime < RATE_LIMIT_WINDOW / MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    // Update rate limit tracker
    rateLimitMap.set(ip, now);

    // Clean up old entries (older than rate limit window)
    for (const [key, time] of rateLimitMap.entries()) {
      if (now - time > RATE_LIMIT_WINDOW) {
        rateLimitMap.delete(key);
      }
    }

    // Increment counter in Redis
    const cache = getRedisCache();
    let newCount = 1;
    
    if (cache.isAvailable()) {
      const currentCount = await cache.get<number>(VISITOR_COUNT_KEY);
      newCount = (currentCount || 0) + 1;
      await cache.set(VISITOR_COUNT_KEY, newCount);
    }

    return NextResponse.json({ total: newCount });
  } catch (error) {
    console.error('Error processing visitor request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
