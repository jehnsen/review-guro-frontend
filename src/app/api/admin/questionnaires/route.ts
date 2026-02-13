/**
 * Admin Questionnaires API Routes
 * GET  /api/admin/questionnaires - List all questionnaires
 * POST /api/admin/questionnaires - Create a new questionnaire
 */

import { NextRequest, NextResponse } from 'next/server';
import { withAdminAuth } from '@/server/middlewares/withAdminAuth';
import { AdminQuestionnaireService } from '@/server/services/admin.questionnaire.service';
import { createErrorResponse } from '@/server/utils/nextResponse';
import { AdminQuestionnaireListFilters, CreateQuestionnaireDTO } from '@/server/types/admin';

/**
 * GET /api/admin/questionnaires
 * List all questionnaires with pagination and filters
 */
export const GET = withAdminAuth(async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    const filters: AdminQuestionnaireListFilters = {
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20,
      isActive: searchParams.get('isActive') ? searchParams.get('isActive') === 'true' : undefined,
      difficulty: (searchParams.get('difficulty') as any) || undefined,
      search: searchParams.get('search') || undefined,
    };

    const result = await AdminQuestionnaireService.listQuestionnaires(filters);

    return NextResponse.json({
      success: true,
      message: 'Questionnaires retrieved successfully',
      data: result.data,
      meta: result.meta,
    });
  } catch (error) {
    return createErrorResponse(error as Error);
  }
});

/**
 * POST /api/admin/questionnaires
 * Create a new questionnaire
 */
export const POST = withAdminAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();

    const data: CreateQuestionnaireDTO = {
      title: body.title,
      description: body.description,
      number: body.number,
      isActive: body.isActive !== undefined ? body.isActive : true,
      difficulty: body.difficulty,
      timeLimit: body.timeLimit,
      passingScore: body.passingScore,
      questionIds: body.questionIds,
    };

    const questionnaire = await AdminQuestionnaireService.createQuestionnaire(data);

    return NextResponse.json({
      success: true,
      message: 'Questionnaire created successfully',
      data: questionnaire,
    }, { status: 201 });
  } catch (error) {
    return createErrorResponse(error as Error);
  }
});
