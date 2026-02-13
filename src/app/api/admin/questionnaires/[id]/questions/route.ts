/**
 * Admin Questionnaire Questions API Routes
 * POST /api/admin/questionnaires/[id]/questions - Add questions to questionnaire
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AdminQuestionnaireService } from '@/server/services/admin.questionnaire.service';
import { createErrorResponse } from '@/server/utils/nextResponse';
import { AddQuestionsToQuestionnaireDTO } from '@/server/types/admin';

/**
 * POST /api/admin/questionnaires/[id]/questions
 * Add questions to a questionnaire
 */
export const POST = withAdminAuth(async (req: NextRequest, context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const data: AddQuestionsToQuestionnaireDTO = {
      questionIds: body.questionIds || [],
    };

    const questionnaire = await AdminQuestionnaireService.addQuestions(id, data);

    return NextResponse.json({
      success: true,
      message: 'Questions added successfully',
      data: questionnaire,
    });
  } catch (error) {
    return createErrorResponse(error as Error);
  }
});
