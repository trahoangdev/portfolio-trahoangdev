import { NextRequest, NextResponse } from 'next/server';
import { sanitizeString } from '@/lib/validation';

// Simple in-memory counter (will reset on server restart)
// In production, you should use a database or Redis
let visitorCount = 0;

// Rate limiting: Track IPs and their last request time
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

export const runtime = 'edge';

/**
 * GET /api/visitor - Get current visitor count
 */
export async function GET() {
  return NextResponse.json({ total: visitorCount });
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

    // Increment counter
    visitorCount++;

    return NextResponse.json({ total: visitorCount });
  } catch (error) {
    console.error('Error processing visitor request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
