/**
 * POST /api/auth/refresh
 * Refresh access token using refresh token (with rotation)
 */

import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/server/services/auth.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';

export async function POST(request: NextRequest) {
  try {
    // Get refresh token from httpOnly cookie
    const refreshToken = request.cookies.get('refresh_token')?.value;

    if (!refreshToken) {
      return createErrorResponse(
        new Error('No refresh token provided'),
        401
      );
    }

    // Extract user agent and IP address for session tracking
    const userAgent = request.headers.get('user-agent') || undefined;
    const ipAddress = request.headers.get('x-forwarded-for') ||
                      request.headers.get('x-real-ip') ||
                      undefined;

    // Refresh tokens (rotation - old refresh token is invalidated)
    const result = await authService.refreshAccessToken(
      refreshToken,
      userAgent,
      ipAddress
    );

    // Create response
    const response = createSuccessResponse(
      {
        user: result.user,
        expiresIn: result.expiresIn,
      },
      'Token refreshed successfully'
    );

    // Set new access token cookie (short-lived, 15 minutes)
    response.cookies.set('auth_token', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    });

    // Set new refresh token cookie (rotation - long-lived, 7 days)
    response.cookies.set('refresh_token', result.refreshToken!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/api/auth/refresh',
    });

    return response;
  } catch (error) {
    return createErrorResponse(error as Error, 401);
  }
}
