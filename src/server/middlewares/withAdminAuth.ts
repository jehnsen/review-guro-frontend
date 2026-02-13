/**
 * Admin Authentication Middleware
 * Wrapper for admin-only API routes in Next.js App Router
 *
 * This middleware extends withAuth to add role-based access control.
 * Only users with role === 'ADMIN' can access routes wrapped with this middleware.
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest, getAuthUser } from './withAuth';
import { createErrorResponse } from '../utils/nextResponse';
import { ForbiddenError } from '../utils/errors';

/**
 * Higher-order function to wrap API route handlers with admin authentication
 *
 * Usage:
 * ```ts
 * export const GET = withAdminAuth(async (request, { params }) => {
 *   const userId = request.user.userId;
 *   // ... your admin logic
 * });
 * ```
 *
 * Security:
 * - First verifies authentication via withAuth (JWT token)
 * - Then verifies user role is ADMIN
 * - Returns 403 Forbidden for non-admin users
 * - Returns 401 Unauthorized for unauthenticated users
 */
export function withAdminAuth<T extends unknown[]>(
  handler: (request: AuthenticatedRequest, ...args: T) => Promise<NextResponse>
) {
  return withAuth(async (request: AuthenticatedRequest, ...args: T): Promise<NextResponse> => {
    try {
      // Get authenticated user from request
      const user = getAuthUser(request);

      // Verify admin role
      if (user.role !== 'ADMIN') {
        return createErrorResponse(
          new ForbiddenError('Admin access required'),
          403
        );
      }

      // User is authenticated and is an admin, proceed with handler
      return await handler(request, ...args);
    } catch (error) {
      // If any error occurs during role check, return forbidden
      return createErrorResponse(
        error instanceof Error ? error : new ForbiddenError('Admin access required'),
        403
      );
    }
  });
}
