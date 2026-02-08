/**
 * Rate Limiting Middleware for Next.js API Routes
 * Wraps API route handlers with rate limiting protection
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  rateLimitService,
  createRateLimitKey,
  RATE_LIMITS,
} from '../services/rateLimit.service';

type RateLimitConfig = (typeof RATE_LIMITS)[keyof typeof RATE_LIMITS];

interface RateLimitOptions {
  limit: RateLimitConfig;
  // Optional: custom key generator for more granular limiting
  keyGenerator?: (req: NextRequest) => string;
  // Optional: identifier for the endpoint (used in rate limit key)
  endpoint?: string;
}

/**
 * Extract client IP address from request headers
 */
function getClientIp(request: NextRequest): string {
  // Check various headers that might contain the real IP
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return xForwardedFor.split(',')[0].trim();
  }

  const xRealIp = request.headers.get('x-real-ip');
  if (xRealIp) {
    return xRealIp;
  }

  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Fallback - this shouldn't happen in production behind a proxy
  return 'unknown';
}

/**
 * Create a rate-limited API route handler
 *
 * @param handler - The original route handler
 * @param options - Rate limiting configuration
 * @returns Wrapped handler with rate limiting
 *
 * @example
 * export const POST = withRateLimit(
 *   async (request) => { ... },
 *   { limit: RATE_LIMITS.LOGIN, endpoint: 'login' }
 * );
 */
export function withRateLimit<T extends NextRequest>(
  handler: (request: T, context?: unknown) => Promise<NextResponse>,
  options: RateLimitOptions
) {
  return async (request: T, context?: unknown): Promise<NextResponse> => {
    const ip = getClientIp(request);
    const endpoint = options.endpoint || request.nextUrl.pathname;

    // Generate rate limit key
    const key = options.keyGenerator
      ? options.keyGenerator(request)
      : createRateLimitKey(ip, endpoint);

    // Check rate limit
    const result = await rateLimitService.checkLimit(key, options.limit);

    // Set rate limit headers on response
    const setRateLimitHeaders = (response: NextResponse): NextResponse => {
      response.headers.set('X-RateLimit-Limit', options.limit.maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
      response.headers.set('X-RateLimit-Reset', result.resetAt.toString());

      if (result.retryAfter) {
        response.headers.set('Retry-After', result.retryAfter.toString());
      }

      return response;
    };

    // If rate limited, return 429 Too Many Requests
    if (!result.allowed) {
      const response = NextResponse.json(
        {
          error: 'Too many requests',
          message: `Rate limit exceeded. Please try again in ${result.retryAfter} seconds.`,
          retryAfter: result.retryAfter,
        },
        { status: 429 }
      );

      return setRateLimitHeaders(response);
    }

    // Call the original handler
    const response = await handler(request, context);

    // Add rate limit headers to successful response
    return setRateLimitHeaders(response);
  };
}

/**
 * Convenience wrapper for common rate limit configurations
 */
export const rateLimiters = {
  /**
   * Rate limit for login endpoint (5 requests per minute)
   */
  login: <T extends NextRequest>(handler: (request: T, context?: unknown) => Promise<NextResponse>) =>
    withRateLimit(handler, { limit: RATE_LIMITS.LOGIN, endpoint: 'auth/login' }),

  /**
   * Rate limit for registration endpoint (3 requests per minute)
   */
  register: <T extends NextRequest>(handler: (request: T, context?: unknown) => Promise<NextResponse>) =>
    withRateLimit(handler, { limit: RATE_LIMITS.REGISTER, endpoint: 'auth/register' }),

  /**
   * Rate limit for forgot password endpoint (3 requests per minute)
   */
  forgotPassword: <T extends NextRequest>(handler: (request: T, context?: unknown) => Promise<NextResponse>) =>
    withRateLimit(handler, { limit: RATE_LIMITS.FORGOT_PASSWORD, endpoint: 'auth/forgot-password' }),

  /**
   * Rate limit for reset password endpoint (5 requests per minute)
   */
  resetPassword: <T extends NextRequest>(handler: (request: T, context?: unknown) => Promise<NextResponse>) =>
    withRateLimit(handler, { limit: RATE_LIMITS.RESET_PASSWORD, endpoint: 'auth/reset-password' }),

  /**
   * Rate limit for resend verification endpoint (3 requests per minute)
   */
  resendVerification: <T extends NextRequest>(handler: (request: T, context?: unknown) => Promise<NextResponse>) =>
    withRateLimit(handler, { limit: RATE_LIMITS.RESEND_VERIFICATION, endpoint: 'auth/resend-verification' }),

  /**
   * Rate limit for AI explanation endpoint (10 requests per minute)
   */
  aiExplain: <T extends NextRequest>(handler: (request: T, context?: unknown) => Promise<NextResponse>) =>
    withRateLimit(handler, { limit: RATE_LIMITS.AI_EXPLAIN, endpoint: 'practice/explain' }),

  /**
   * Rate limit for AI insights endpoint (5 requests per minute)
   */
  aiInsights: <T extends NextRequest>(handler: (request: T, context?: unknown) => Promise<NextResponse>) =>
    withRateLimit(handler, { limit: RATE_LIMITS.AI_INSIGHTS, endpoint: 'analytics/ai-insights' }),

  /**
   * Rate limit for general practice endpoints (30 requests per minute)
   */
  practice: <T extends NextRequest>(handler: (request: T, context?: unknown) => Promise<NextResponse>) =>
    withRateLimit(handler, { limit: RATE_LIMITS.API_PRACTICE, endpoint: 'practice' }),

  /**
   * Rate limit for general API endpoints (60 requests per minute)
   */
  general: <T extends NextRequest>(handler: (request: T, context?: unknown) => Promise<NextResponse>) =>
    withRateLimit(handler, { limit: RATE_LIMITS.API_GENERAL }),
};

// Re-export for convenience
export { RATE_LIMITS };
