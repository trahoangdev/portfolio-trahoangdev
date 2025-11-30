import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory counter (will reset on server restart)
// In production, you should use a database or Redis
let visitorCount = 0;

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
  // Increment counter
  visitorCount++;

  // Optional: Add rate limiting or IP tracking here
  // const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');

  return NextResponse.json({ total: visitorCount });
}
