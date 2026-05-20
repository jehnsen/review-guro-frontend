/**
 * POST /api/auth/logout
 * Clear authentication cookies and revoke refresh token
 */

import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/server/services/auth.service';
import { auditService } from '@/server/services/audit.service';
import { createSuccessResponse } from '@/server/utils/nextResponse';

export async function POST(request: NextRequest) {
  // Get refresh token from cookie to revoke it in database
  const refreshToken = request.cookies.get('refresh_token')?.value;

  // Decode userId from the access token cookie (best-effort, for audit logging only)
  let auditUserId: string | undefined;
  const accessToken = request.cookies.get('auth_token')?.value;
  if (accessToken) {
    try {
      const payload = JSON.parse(atob(accessToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      auditUserId = payload.userId;
    } catch {}
  }

  if (refreshToken) {
    try {
      await authService.signout(refreshToken);
    } catch (error) {
      console.error('Failed to revoke refresh token:', error);
    }
  }

  auditService.log({
    userId: auditUserId,
    action: 'user.logout',
    resource: 'user',
    resourceId: auditUserId,
    ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
    userAgent: request.headers.get('user-agent') || undefined,
  });

  // Create response
  const response = createSuccessResponse(
    { message: 'Logged out successfully' },
    'Logout successful'
  );

  // Clear the auth_token httpOnly cookie
  response.cookies.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // Expire immediately
    path: '/',
  });

  // Clear the refresh_token httpOnly cookie
  response.cookies.set('refresh_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // Expire immediately
    path: '/api/auth/refresh',
  });

  return response;
}
