/**
 * Next.js Authentication Middleware
 * Wrapper for authenticating API routes in Next.js App Router
 */

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { AuthTokenPayload } from '../types';
import { createErrorResponse } from '../utils/nextResponse';
import { UnauthorizedError } from '../utils/errors';

export interface AuthenticatedRequest extends NextRequest {
  user?: AuthTokenPayload;
}

/**
 * Extract JWT token from Authorization header
 */
function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.substring(7);
}

/**
 * Verify and decode JWT token
 */
function verifyToken(token: string): AuthTokenPayload {
  try {
    return jwt.verify(token, config.jwt.secret) as AuthTokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError('Token expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError('Invalid token');
    }
    throw new UnauthorizedError('Authentication failed');
  }
}

/**
 * Higher-order function to wrap API route handlers with authentication
 *
 * Usage:
 * ```ts
 * export const GET = withAuth(async (request, { params }) => {
 *   const userId = request.user.userId;
 *   // ... your logic
 * });
 * ```
 */
export function withAuth<T extends unknown[]>(
  handler: (request: AuthenticatedRequest, ...args: T) => Promise<NextResponse>
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    try {
      // Extract and verify token
      const token = extractToken(request);

      if (!token) {
        throw new UnauthorizedError('No authentication token provided');
      }

      const user = verifyToken(token);

      // Attach user to request
      (request as AuthenticatedRequest).user = user;

      // Call the original handler
      return await handler(request as AuthenticatedRequest, ...args);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return createErrorResponse(error);
      }

      return createErrorResponse(
        new UnauthorizedError('Authentication failed')
      );
    }
  };
}

/**
 * Get authenticated user from request
 * Use this inside route handlers wrapped with withAuth
 */
export function getAuthUser(request: AuthenticatedRequest): AuthTokenPayload {
  if (!request.user) {
    throw new UnauthorizedError('User not authenticated');
  }
  return request.user;
}
