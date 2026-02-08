/**
 * POST /api/auth/register
 * Register a new user account and set httpOnly cookie with JWT
 * Rate limited: 3 requests per minute per IP
 */

import { NextRequest, NextResponse } from 'next/server';
import { authService } from '@/server/services/auth.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { rateLimiters } from '@/server/middlewares/rateLimit';
import { RegisterDTO } from '@/server/types';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

async function handler(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = registerSchema.parse(body);

    // Extract user agent and IP address for session tracking
    const userAgent = request.headers.get('user-agent') || undefined;
    const ipAddress = request.headers.get('x-forwarded-for') ||
                      request.headers.get('x-real-ip') ||
                      undefined;

    // Register user and create session
    const result = await authService.register(
      validatedData as RegisterDTO,
      userAgent,
      ipAddress
    );

    // Create response with user data (tokens not in body for security)
    const response = createSuccessResponse(
      {
        user: result.user,
        expiresIn: result.expiresIn,
        emailVerificationSent: true,
      },
      'Registration successful. Please check your email to verify your account.',
      201
    );

    // Set httpOnly cookie with access token (short-lived, 15 minutes)
    // This prevents XSS attacks as JavaScript cannot access httpOnly cookies
    response.cookies.set('auth_token', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes (matches JWT_EXPIRES_IN)
      path: '/',
    });

    // Set httpOnly cookie with refresh token (long-lived, 7 days)
    // Used to get new access tokens without re-login
    response.cookies.set('refresh_token', result.refreshToken!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/api/auth/refresh', // Only sent to refresh endpoint
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(
        new Error(error.errors[0]?.message || 'Validation failed'),
        400
      );
    }

    return createErrorResponse(error as Error);
  }
}

export const POST = rateLimiters.register(handler);
