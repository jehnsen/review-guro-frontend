/**
 * POST /api/practice/chat
 * Chat with AI tutor about a specific question
 * Rate limited: 10 requests per minute per IP
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { withRateLimit, RATE_LIMITS } from '@/server/middlewares/rateLimit';
import { practiceService } from '@/server/services/practice.service';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { z } from 'zod';

const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(2000),
});

const chatSchema = z.object({
  questionId: z.string().min(1, 'Question ID is required'),
  message: z.string().min(1, 'Message is required').max(1000),
  conversationHistory: z.array(chatMessageSchema).max(20).default([]),
});

async function handler(request: AuthenticatedRequest) {
  try {
    getAuthUser(request); // Ensure user is authenticated
    const body = await request.json();

    const validatedData = chatSchema.parse(body);

    const result = await practiceService.chatWithTutor(validatedData);

    return createSuccessResponse(result, 'Chat response generated');
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

export const POST = withRateLimit(
  withAuth(handler),
  { limit: RATE_LIMITS.AI_EXPLAIN, endpoint: 'practice/chat' }
);
