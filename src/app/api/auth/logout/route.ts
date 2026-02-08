/**
 * POST /api/auth/logout
 * Clear authentication cookies and revoke refresh token
 */

import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/server/services/auth.service';
import { createSuccessResponse } from '@/server/utils/nextResponse';

export async function POST(request: NextRequest) {
  // Get refresh token from cookie to revoke it in database
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (refreshToken) {
    try {
      // Revoke refresh token in database
      await authService.signout(refreshToken);
    } catch (error) {
      // Continue with logout even if revocation fails
      console.error('Failed to revoke refresh token:', error);
    }
  }

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
