/**
 * Rate Limiting Service
 * Implements sliding window rate limiting with Redis (with in-memory fallback)
 *
 * Uses sliding window log algorithm:
 * - Tracks timestamps of requests in a sorted set
 * - Removes expired entries on each request
 * - Counts remaining entries to determine if rate limit exceeded
 */

import Redis from 'ioredis';
import { config } from '../config/env';

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number; // Unix timestamp when the window resets
  retryAfter?: number; // Seconds until next request allowed
}

interface RateLimitConfig {
  maxRequests: number; // Maximum requests allowed in the window
  windowMs: number; // Time window in milliseconds
}

// Predefined rate limit configurations for different endpoints
export const RATE_LIMITS = {
  // Authentication endpoints - strict limits to prevent brute force
  LOGIN: { maxRequests: 5, windowMs: 60 * 1000 }, // 5 per minute
  REGISTER: { maxRequests: 3, windowMs: 60 * 1000 }, // 3 per minute
  FORGOT_PASSWORD: { maxRequests: 3, windowMs: 60 * 1000 }, // 3 per minute
  RESET_PASSWORD: { maxRequests: 5, windowMs: 60 * 1000 }, // 5 per minute
  RESEND_VERIFICATION: { maxRequests: 3, windowMs: 60 * 1000 }, // 3 per minute

  // AI endpoints - moderate limits to control costs
  AI_EXPLAIN: { maxRequests: 10, windowMs: 60 * 1000 }, // 10 per minute
  AI_INSIGHTS: { maxRequests: 5, windowMs: 60 * 1000 }, // 5 per minute

  // General API endpoints - higher limits for normal usage
  API_GENERAL: { maxRequests: 60, windowMs: 60 * 1000 }, // 60 per minute
  API_PRACTICE: { maxRequests: 30, windowMs: 60 * 1000 }, // 30 per minute
} as const;

class RateLimitService {
  private redisClient: Redis | null = null;
  private memoryStore: Map<string, { timestamps: number[]; windowMs: number }> = new Map();
  private isRedisAvailable: boolean = false;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.initRedis();
    // Clean up in-memory store periodically (every 5 minutes)
    this.cleanupInterval = setInterval(() => this.cleanupMemoryStore(), 5 * 60 * 1000);
  }

  private async initRedis() {
    if (!config.redis.url) {
      console.log('⚠️  Rate limiter: Redis not configured, using in-memory fallback');
      return;
    }

    try {
      this.redisClient = new Redis(config.redis.url, {
        maxRetriesPerRequest: 3,
        retryStrategy: (times) => {
          const delay = Math.min(times * 100, 3000);
          return delay;
        },
        lazyConnect: true,
        enableReadyCheck: true,
      });

      this.redisClient.on('ready', () => {
        this.isRedisAvailable = true;
        console.log('🟢 Rate limiter: Redis connected');
      });

      this.redisClient.on('error', (error) => {
        console.error('🔴 Rate limiter Redis error:', error.message);
        this.isRedisAvailable = false;
      });

      this.redisClient.on('close', () => {
        this.isRedisAvailable = false;
      });

      await this.redisClient.connect();
    } catch (error) {
      console.error('❌ Rate limiter: Failed to connect to Redis:', error);
      this.isRedisAvailable = false;
    }
  }

  /**
   * Check rate limit for a given key
   * @param key - Unique identifier (usually IP:endpoint or userId:endpoint)
   * @param limitConfig - Rate limit configuration
   * @returns Rate limit result with allowed status and metadata
   */
  async checkLimit(key: string, limitConfig: RateLimitConfig): Promise<RateLimitResult> {
    if (this.isRedisAvailable && this.redisClient) {
      return this.checkLimitRedis(key, limitConfig);
    }
    return this.checkLimitMemory(key, limitConfig);
  }

  /**
   * Redis-based rate limiting using sorted sets (sliding window)
   */
  private async checkLimitRedis(key: string, { maxRequests, windowMs }: RateLimitConfig): Promise<RateLimitResult> {
    const now = Date.now();
    const windowStart = now - windowMs;
    const redisKey = `ratelimit:${key}`;

    try {
      // Use a pipeline for atomic operations
      const pipeline = this.redisClient!.pipeline();

      // Remove expired entries
      pipeline.zremrangebyscore(redisKey, 0, windowStart);

      // Count current entries
      pipeline.zcard(redisKey);

      // Add current request timestamp
      pipeline.zadd(redisKey, now, `${now}-${Math.random()}`);

      // Set expiry on the key
      pipeline.pexpire(redisKey, windowMs);

      const results = await pipeline.exec();

      // results[1] is the zcard result: [error, count]
      const currentCount = (results?.[1]?.[1] as number) || 0;
      const allowed = currentCount < maxRequests;
      const remaining = Math.max(0, maxRequests - currentCount - 1);
      const resetAt = now + windowMs;

      if (!allowed) {
        // Get the oldest timestamp to calculate retry-after
        const oldest = await this.redisClient!.zrange(redisKey, 0, 0, 'WITHSCORES');
        const oldestTimestamp = oldest.length >= 2 ? parseInt(oldest[1], 10) : now;
        const retryAfter = Math.ceil((oldestTimestamp + windowMs - now) / 1000);

        return {
          allowed: false,
          remaining: 0,
          resetAt,
          retryAfter: Math.max(1, retryAfter),
        };
      }

      return { allowed, remaining, resetAt };
    } catch (error) {
      console.error('Rate limit Redis error:', error);
      // Fail open - allow request if Redis fails
      return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
    }
  }

  /**
   * In-memory rate limiting fallback (for development or when Redis unavailable)
   */
  private checkLimitMemory(key: string, { maxRequests, windowMs }: RateLimitConfig): RateLimitResult {
    const now = Date.now();
    const windowStart = now - windowMs;

    let record = this.memoryStore.get(key);

    if (!record) {
      record = { timestamps: [], windowMs };
      this.memoryStore.set(key, record);
    }

    // Remove expired timestamps
    record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

    const currentCount = record.timestamps.length;
    const allowed = currentCount < maxRequests;
    const remaining = Math.max(0, maxRequests - currentCount - 1);
    const resetAt = now + windowMs;

    if (!allowed) {
      const oldestTimestamp = record.timestamps[0] || now;
      const retryAfter = Math.ceil((oldestTimestamp + windowMs - now) / 1000);

      return {
        allowed: false,
        remaining: 0,
        resetAt,
        retryAfter: Math.max(1, retryAfter),
      };
    }

    // Add current request
    record.timestamps.push(now);

    return { allowed, remaining, resetAt };
  }

  /**
   * Clean up expired entries from in-memory store
   */
  private cleanupMemoryStore() {
    const now = Date.now();

    for (const [key, record] of this.memoryStore.entries()) {
      const windowStart = now - record.windowMs;
      record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

      if (record.timestamps.length === 0) {
        this.memoryStore.delete(key);
      }
    }
  }

  /**
   * Reset rate limit for a specific key (useful for testing or admin actions)
   */
  async resetLimit(key: string): Promise<void> {
    const redisKey = `ratelimit:${key}`;

    if (this.isRedisAvailable && this.redisClient) {
      await this.redisClient.del(redisKey);
    }

    this.memoryStore.delete(key);
  }

  /**
   * Clean up resources
   */
  async shutdown(): Promise<void> {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    if (this.redisClient) {
      await this.redisClient.quit();
    }
  }
}

// Export singleton instance
export const rateLimitService = new RateLimitService();

// Helper function to create a rate limit key from request info
export function createRateLimitKey(
  ip: string | null,
  endpoint: string,
  userId?: string
): string {
  // Use IP for unauthenticated requests, userId for authenticated
  const identifier = userId || ip || 'unknown';
  return `${identifier}:${endpoint}`;
}
