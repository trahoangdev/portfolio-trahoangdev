/**
 * @jest-environment node
 */

import { Redis } from '@upstash/redis';
import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/visitor/route';
import * as cacheModule from '@/lib/cache/RedisCache';

jest.mock('@upstash/redis', () => ({
  Redis: jest.fn().mockImplementation(() => ({ get: jest.fn(), eval: jest.fn(), incr: jest.fn() })),
}));

jest.mock('@/lib/cache/RedisCache', () => ({
  ...jest.requireActual('@/lib/cache/RedisCache'),
  getRedisCache: jest.fn(),
}));

describe('GET /api/visitor', () => {
  const originalEnv = process.env;
  let redisGet: jest.Mock;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      KV_REST_API_URL: 'https://test.upstash.io',
      KV_REST_API_TOKEN: 'test-token',
    };
    const cache = new cacheModule.RedisCache();
    redisGet = jest.mocked(Redis).mock.results.at(-1)!.value.get;
    jest.mocked(cacheModule.getRedisCache).mockReturnValue(cache);
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('returns the stored visitor count', async () => {
    redisGet.mockResolvedValue(42);
    const response = await GET();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ total: 42, available: true });
    expect(redisGet).toHaveBeenCalledWith('visitor:count');
  });

  it('returns zero when the counter has not been created yet', async () => {
    redisGet.mockResolvedValue(null);
    expect(await (await GET()).json()).toEqual({ total: 0, available: true });
  });

  it('preserves an existing zero count', async () => {
    redisGet.mockResolvedValue(0);
    expect(await (await GET()).json()).toEqual({ total: 0, available: true });
  });

  it('returns unavailable when Redis is not configured', async () => {
    delete process.env.KV_REST_API_URL;
    delete process.env.KV_REST_API_TOKEN;
    jest.mocked(cacheModule.getRedisCache).mockReturnValue(new cacheModule.RedisCache());
    expect(await (await GET()).json()).toEqual({ total: null, available: false });
    expect(redisGet).not.toHaveBeenCalled();
  });

  it('returns unavailable instead of a false zero when Redis fails', async () => {
    redisGet.mockRejectedValue(new Error('Redis connection failed'));
    const response = await GET();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ total: null, available: false });
  });
});

describe('POST /api/visitor rate limiting', () => {
  const originalEnv = process.env;
  let redisEval: jest.Mock;
  let redisIncr: jest.Mock;
  const request = () => new NextRequest('http://localhost/api/visitor', {
    method: 'POST', headers: { 'x-forwarded-for': '192.0.2.1' },
  });

  beforeEach(() => {
    process.env = { ...originalEnv, KV_REST_API_URL: 'https://test.upstash.io', KV_REST_API_TOKEN: 'test-token' };
    const cache = new cacheModule.RedisCache();
    const redis = jest.mocked(Redis).mock.results.at(-1)!.value;
    redisEval = redis.eval;
    redisIncr = redis.incr;
    jest.mocked(cacheModule.getRedisCache).mockReturnValue(cache);
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('accepts ten requests then rejects the eleventh without changing the total', async () => {
    for (let count = 1; count <= 11; count++) {
      redisEval.mockResolvedValueOnce(count);
      redisIncr.mockResolvedValue(100 + count);
      const response = await POST(request());
      expect(response.status).toBe(count <= 10 ? 200 : 429);
      if (count <= 10) expect(await response.json()).toEqual({ total: 100 + count, available: true });
    }
    expect(redisIncr).toHaveBeenCalledTimes(10);
    expect(redisEval.mock.calls[0][1][0]).toMatch(/^visitor:rate-limit:[a-f0-9]{64}$/);
    expect(redisEval.mock.calls[0][2]).toEqual([60]);
  });

  it('fails closed when the atomic rate limit operation fails', async () => {
    redisEval.mockRejectedValue(new Error('Redis unavailable'));
    const response = await POST(request());
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual(expect.objectContaining({ available: false }));
    expect(redisIncr).not.toHaveBeenCalled();
  });

  it('returns unavailable if incrementing the visitor counter fails', async () => {
    redisEval.mockResolvedValue(1);
    redisIncr.mockRejectedValue(new Error('Redis unavailable'));
    const response = await POST(request());
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual(expect.objectContaining({ available: false }));
  });

  it('does not call Redis when configuration is absent', async () => {
    delete process.env.KV_REST_API_URL;
    delete process.env.KV_REST_API_TOKEN;
    jest.mocked(cacheModule.getRedisCache).mockReturnValue(new cacheModule.RedisCache());
    expect(await (await POST(request())).json()).toEqual({ total: null, available: false });
    expect(redisEval).not.toHaveBeenCalled();
    expect(redisIncr).not.toHaveBeenCalled();
  });
});
