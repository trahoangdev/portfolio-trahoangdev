// lib/redis.ts
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.REDIS_URL?.replace('rediss://', 'https://') || '',
  token: process.env.KV_REST_API_TOKEN || process.env.REDIS_TOKEN || '',
});

export default redis;