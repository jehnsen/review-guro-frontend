/**
 * Admin Question Management API Routes (Single Question)
 * GET /api/admin/questions/[id] - Get question details (admin only)
 * PATCH /api/admin/questions/[id] - Update question (admin only)
 * DELETE /api/admin/questions/[id] - Delete question (admin only)
 */

import { NextRequest } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { adminQuestionService } from '@/server/services/admin.question.service';
import {
  createSuccessResponse,
  createErrorResponse,
} from '@/server/utils/nextResponse';
import { UpdateQuestionDTO } from '@/server/types';

/**
 * GET /api/admin/questions/[id]
 * Get single question by ID
 */
async function getHandler(
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const question = await adminQuestionService.getQuestionById(id);

    return createSuccessResponse(question, 'Question retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

/**
 * PATCH /api/admin/questions/[id]
 * Update an existing question
 */
async function patchHandler(
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as UpdateQuestionDTO;

    const question = await adminQuestionService.updateQuestion(id, body);

    return createSuccessResponse(question, 'Question updated successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

/**
 * DELETE /api/admin/questions/[id]
 * Delete a question
 */
async function deleteHandler(
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await adminQuestionService.deleteQuestion(id);

    return createSuccessResponse(null, 'Question deleted successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

export const GET = withAdminAuth(getHandler);
export const PATCH = withAdminAuth(patchHandler);
export const DELETE = withAdminAuth(deleteHandler);
