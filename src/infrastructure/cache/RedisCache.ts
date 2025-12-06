/**
 * Redis Cache Service
 * Provides caching functionality using Upstash Redis
 */

import { Redis } from '@upstash/redis';

export interface CacheOptions {
  /**
   * Time to live in seconds
   */
  ttl?: number;
}

export class RedisCache {
  private redis: Redis | null = null;

  constructor() {
    // Initialize Redis only if credentials are available
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      this.redis = new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      });
    }
  }

  /**
   * Check if Redis is available
   */
  isAvailable(): boolean {
    return this.redis !== null;
  }

  /**
   * Get value from cache
   */
  async get<T>(key: string): Promise<T | null> {
    if (!this.redis) {
      return null;
    }

    try {
      const value = await this.redis.get<T>(key);
      return value;
    } catch (error) {
      console.error('Redis get error:', error);
      return null;
    }
  }

  /**
   * Set value in cache
   */
  async set<T>(key: string, value: T, options?: CacheOptions): Promise<boolean> {
    if (!this.redis) {
      return false;
    }

    try {
      if (options?.ttl) {
        await this.redis.set(key, value, { ex: options.ttl });
      } else {
        await this.redis.set(key, value);
      }
      return true;
    } catch (error) {
      console.error('Redis set error:', error);
      return false;
    }
  }

  /**
   * Delete value from cache
   */
  async delete(key: string): Promise<boolean> {
    if (!this.redis) {
      return false;
    }

    try {
      await this.redis.del(key);
      return true;
    } catch (error) {
      console.error('Redis delete error:', error);
      return false;
    }
  }

  /**
   * Check if key exists
   */
  async exists(key: string): Promise<boolean> {
    if (!this.redis) {
      return false;
    }

    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Redis exists error:', error);
      return false;
    }
  }

  /**
   * Get or set pattern - fetch from cache or compute and cache
   */
  async getOrSet<T>(
    key: string,
    fetchFn: () => Promise<T>,
    options?: CacheOptions
  ): Promise<T> {
    // Try to get from cache first
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    // If not in cache, fetch and cache
    const value = await fetchFn();
    await this.set(key, value, options);
    return value;
  }
}

// Singleton instance
let cacheInstance: RedisCache | null = null;

export function getRedisCache(): RedisCache {
  if (!cacheInstance) {
    cacheInstance = new RedisCache();
  }
  return cacheInstance;
}
