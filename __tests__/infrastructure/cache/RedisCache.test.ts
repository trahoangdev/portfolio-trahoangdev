/**
 * @jest-environment node
 */

import { RedisCache } from '@/infrastructure/cache/RedisCache';

// Mock global fetch
global.fetch = jest.fn();

describe('RedisCache', () => {
  let cache: RedisCache;
  const originalEnv = process.env;

  beforeEach(() => {
    // Clear environment variables for testing
    process.env = { ...originalEnv };
    delete process.env.KV_REST_API_URL;
    delete process.env.KV_REST_API_TOKEN;
    cache = new RedisCache();
    jest.clearAllMocks();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('isAvailable', () => {
    it('should return false when Redis credentials are not configured', () => {
      expect(cache.isAvailable()).toBe(false);
    });

    it('should return true when Redis credentials are configured', () => {
      process.env.KV_REST_API_URL = 'https://test.upstash.io';
      process.env.KV_REST_API_TOKEN = 'test-token';
      const cacheWithCreds = new RedisCache();
      expect(cacheWithCreds.isAvailable()).toBe(true);
    });
  });

  describe('get', () => {
    it('should return null when Redis is not available', async () => {
      const result = await cache.get('test-key');
      expect(result).toBeNull();
    });
  });

  describe('set', () => {
    it('should return false when Redis is not available', async () => {
      const result = await cache.set('test-key', 'test-value');
      expect(result).toBe(false);
    });
  });

  describe('delete', () => {
    it('should return false when Redis is not available', async () => {
      const result = await cache.delete('test-key');
      expect(result).toBe(false);
    });
  });

  describe('exists', () => {
    it('should return false when Redis is not available', async () => {
      const result = await cache.exists('test-key');
      expect(result).toBe(false);
    });
  });

  describe('getOrSet', () => {
    it('should call fetchFn and return value when Redis is not available', async () => {
      const fetchFn = jest.fn().mockResolvedValue('fetched-value');
      const result = await cache.getOrSet('test-key', fetchFn);
      
      expect(fetchFn).toHaveBeenCalled();
      expect(result).toBe('fetched-value');
    });

    it('should propagate fetchFn errors', async () => {
      const fetchFn = jest.fn().mockRejectedValue(new Error('Fetch failed'));
      
      await expect(cache.getOrSet('test-key', fetchFn)).rejects.toThrow('Fetch failed');
      expect(fetchFn).toHaveBeenCalled();
    });

    it('should cache the result when Redis is available', async () => {
      // Mock fetch to simulate Redis responses
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ result: null }), // GET returns null (cache miss)
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ result: 'OK' }), // SET succeeds
        });

      process.env.KV_REST_API_URL = 'https://test.upstash.io';
      process.env.KV_REST_API_TOKEN = 'test-token';
      const cacheWithCreds = new RedisCache();
      
      const fetchFn = jest.fn().mockResolvedValue('fetched-value');
      // First call should fetch and cache
      const result = await cacheWithCreds.getOrSet('test-key', fetchFn);
      
      expect(fetchFn).toHaveBeenCalledTimes(1);
      expect(result).toBe('fetched-value');
      expect(global.fetch).toHaveBeenCalledTimes(2); // GET + SET
    });
  });
});
