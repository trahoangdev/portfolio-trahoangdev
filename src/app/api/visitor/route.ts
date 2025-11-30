import redis from '@/lib/redis';
import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

if (typeof globalThis.self === 'undefined') {
  (globalThis as any).self = globalThis;
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const week = getWeekNumber();

    const [total, todayCount, weekCount] = await Promise.all([
      redis.get<number>('visitor_count'),
      redis.get<number>(`visitor_today:${today}`),
      redis.get<number>(`visitor_week:${week}`),
    ]);

    return NextResponse.json({
      total: total || 0,
      today: todayCount || 0,
      week: weekCount || 0,
    });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json(
      { total: 0, today: 0, week: 0 },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const hashedIP = await hashIP(ip);
    
    const today = new Date().toISOString().split('T')[0];
    const week = getWeekNumber();

    // SET voi NX (only if not exists)
    const isNewToday = await redis.set(
      `visitor:${hashedIP}:${today}`,
      true,
      { ex: 86400, nx: true }
    );

    if (isNewToday) {
      const [totalCount, todayCount, weekCount] = await Promise.all([
        redis.incr('visitor_count'),
        redis.incr(`visitor_today:${today}`),
        redis.incr(`visitor_week:${week}`),
      ]);

      await Promise.all([
        redis.expire(`visitor_today:${today}`, 86400 * 2),
        redis.expire(`visitor_week:${week}`, 86400 * 14),
      ]);

      return NextResponse.json({
        total: totalCount,
        today: todayCount,
        week: weekCount,
        incremented: true,
      });
    }

    const [total, todayCount, weekCount] = await Promise.all([
      redis.get<number>('visitor_count'),
      redis.get<number>(`visitor_today:${today}`),
      redis.get<number>(`visitor_week:${week}`),
    ]);

    return NextResponse.json({
      total: total || 0,
      today: todayCount || 0,
      week: weekCount || 0,
      incremented: false,
    });
  } catch (error) {
    console.error('Failed to track visitor:', error);
    return NextResponse.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    );
  }
}

async function hashIP(ip: string): Promise<string> {
  const salted = ip + (process.env.SALT || '');

  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salted));
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  return createHash('sha256').update(salted).digest('hex');
}

function getWeekNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const weekNum = Math.ceil(
    ((date.getTime() - new Date(year, 0, 1).getTime()) / 86400000 + 1) / 7
  );
  return `${year}-W${weekNum}`;
}
