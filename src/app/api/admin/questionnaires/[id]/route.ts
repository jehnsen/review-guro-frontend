/**
 * Admin Questionnaire Detail API Routes
 * GET    /api/admin/questionnaires/[id] - Get questionnaire details
 * PATCH  /api/admin/questionnaires/[id] - Update questionnaire
 * DELETE /api/admin/questionnaires/[id] - Delete questionnaire
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AdminQuestionnaireService } from '@/server/services/admin.questionnaire.service';
import { createErrorResponse } from '@/server/utils/nextResponse';
import { UpdateQuestionnaireDTO } from '@/server/types/admin';

/**
 * GET /api/admin/questionnaires/[id]
 * Get a single questionnaire with all questions
 */
export const GET = withAdminAuth(async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;

    const questionnaire = await AdminQuestionnaireService.getQuestionnaire(id);

    return NextResponse.json({
      success: true,
      message: 'Questionnaire retrieved successfully',
      data: questionnaire,
    });
  } catch (error) {
    return createErrorResponse(error as Error);
  }
});

/**
 * PATCH /api/admin/questionnaires/[id]
 * Update a questionnaire
 */
export const PATCH = withAdminAuth(async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const data: UpdateQuestionnaireDTO = {
      title: body.title,
      description: body.description,
      number: body.number,
      isActive: body.isActive,
      difficulty: body.difficulty,
      timeLimit: body.timeLimit,
      passingScore: body.passingScore,
    };

    // Remove undefined values
    Object.keys(data).forEach(key =>
      data[key as keyof UpdateQuestionnaireDTO] === undefined &&
      delete data[key as keyof UpdateQuestionnaireDTO]
    );

    const questionnaire = await AdminQuestionnaireService.updateQuestionnaire(id, data);

    return NextResponse.json({
      success: true,
      message: 'Questionnaire updated successfully',
      data: questionnaire,
    });
  } catch (error) {
    return createErrorResponse(error as Error);
  }
});

/**
 * DELETE /api/admin/questionnaires/[id]
 * Delete a questionnaire
 */
export const DELETE = withAdminAuth(async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;

    await AdminQuestionnaireService.deleteQuestionnaire(id);

    return NextResponse.json({
      success: true,
      message: 'Questionnaire deleted successfully',
      data: null,
    });
  } catch (error) {
    return createErrorResponse(error as Error);
  }
});
