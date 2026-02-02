/**
 * Next.js API Response Utilities
 * Standardized response helpers for Next.js App Router API routes
 */

import { NextResponse } from 'next/server';
import { APIResponse, ResponseMeta } from '../types';
import { AppError } from './errors';

/**
 * Create a successful response
 */
export function createSuccessResponse<T>(
  data: T,
  message: string = 'Success',
  statusCode: number = 200,
  meta?: ResponseMeta
): NextResponse<APIResponse<T>> {
  const response: APIResponse<T> = {
    success: true,
    message,
    data,
    ...(meta && { meta }),
  };

  return NextResponse.json(response, { status: statusCode });
}

/**
 * Create a created response (201)
 */
export function createCreatedResponse<T>(
  data: T,
  message: string = 'Created successfully'
): NextResponse<APIResponse<T>> {
  return createSuccessResponse(data, message, 201);
}

/**
 * Create an error response
 */
export function createErrorResponse(
  error: Error | AppError,
  statusCode?: number
): NextResponse<APIResponse<null>> {
  if (error instanceof AppError) {
    const response: APIResponse<null> & { code?: string } = {
      success: false,
      message: error.message,
      data: null,
      ...(error.code && { code: error.code }),
    };

    return NextResponse.json(response, { status: error.statusCode });
  }

  // Generic error handling
  // Log the full error in production for debugging
  if (process.env.NODE_ENV === 'production') {
    console.error('Unexpected API error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
  }

  const message =
    process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : error.message;

  const response: APIResponse<null> = {
    success: false,
    message,
    data: null,
  };

  return NextResponse.json(response, { status: statusCode || 500 });
}

/**
 * Create a paginated response
 */
export function createPaginatedResponse<T>(
  items: T[],
  page: number,
  limit: number,
  total: number,
  message: string = 'Success',
  additionalMeta?: Partial<ResponseMeta>
): NextResponse<APIResponse<T[]>> {
  const totalPages = Math.ceil(total / limit);

  return createSuccessResponse(items, message, 200, {
    page,
    limit,
    total,
    totalPages,
    ...additionalMeta,
  });
}

/**
 * Validate pagination parameters from search params
 */
export function getPaginationParams(searchParams: URLSearchParams): {
  page: number;
  limit: number;
} {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get('limit') || '10', 10))
  );

  return { page, limit };
}
