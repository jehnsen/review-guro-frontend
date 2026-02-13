/**
 * Admin Questionnaire Repository
 * Handles all database operations for questionnaire management
 */

import { prisma } from '@/server/config/database';
import { Difficulty } from '@prisma/client';
import {
  AdminQuestionnaireListFilters,
  CreateQuestionnaireDTO,
  UpdateQuestionnaireDTO,
  QuestionnaireWithQuestions,
} from '@/server/types/admin';

/**
 * Get all questionnaires with pagination and filters
 */
export async function getQuestionnaires(filters: AdminQuestionnaireListFilters = {}) {
  const {
    isActive,
    difficulty,
    search,
    page = 1,
    limit = 20,
  } = filters;

  const skip = (page - 1) * limit;

  // Build where clause
  const where: any = {};

  if (isActive !== undefined) {
    where.isActive = isActive;
  }

  if (difficulty) {
    where.difficulty = difficulty;
  }

  if (search) {
    where.title = {
      contains: search,
      mode: 'insensitive',
    };
  }

  // Get questionnaires with question count
  const [questionnaires, total] = await Promise.all([
    prisma.questionnaire.findMany({
      where,
      skip,
      take: limit,
      include: {
        questions: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        number: 'asc',
      },
    }),
    prisma.questionnaire.count({ where }),
  ]);

  // Map to include actual question count
  const questionnairesWithCount = questionnaires.map(q => ({
    ...q,
    totalQuestions: q.questions.length,
    questions: undefined, // Remove the questions array, only keep count
  }));

  return {
    data: questionnairesWithCount,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Get a single questionnaire by ID with all questions
 */
export async function getQuestionnaireById(id: string): Promise<QuestionnaireWithQuestions | null> {
  const questionnaire = await prisma.questionnaire.findUnique({
    where: { id },
    include: {
      questions: {
        include: {
          question: {
            select: {
              id: true,
              questionText: true,
              category: true,
              difficulty: true,
              options: true,
              correctOptionId: true,
              explanationText: true,
            },
          },
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
  });

  if (!questionnaire) {
    return null;
  }

  // Transform the response
  return {
    id: questionnaire.id,
    title: questionnaire.title,
    description: questionnaire.description,
    number: questionnaire.number,
    isActive: questionnaire.isActive,
    totalQuestions: questionnaire.questions.length,
    difficulty: questionnaire.difficulty,
    timeLimit: questionnaire.timeLimit,
    passingScore: questionnaire.passingScore,
    createdAt: questionnaire.createdAt,
    updatedAt: questionnaire.updatedAt,
    questions: questionnaire.questions.map(qq => ({
      id: qq.id,
      order: qq.order,
      questionId: qq.question.id,
      questionText: qq.question.questionText,
      category: qq.question.category,
      difficulty: qq.question.difficulty,
      options: qq.question.options as any,
      correctOptionId: qq.question.correctOptionId,
      explanationText: qq.question.explanationText,
    })),
  };
}

/**
 * Get a questionnaire by number
 */
export async function getQuestionnaireByNumber(number: number) {
  return await prisma.questionnaire.findUnique({
    where: { number },
    include: {
      questions: {
        include: {
          question: true,
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
  });
}

/**
 * Create a new questionnaire
 */
export async function createQuestionnaire(data: CreateQuestionnaireDTO) {
  const { questionIds, ...questionnaireData } = data;

  // Check if number already exists
  const existing = await prisma.questionnaire.findUnique({
    where: { number: data.number },
  });

  if (existing) {
    throw new Error(`Questionnaire with number ${data.number} already exists`);
  }

  // Create questionnaire with optional questions
  const questionnaire = await prisma.questionnaire.create({
    data: {
      ...questionnaireData,
      totalQuestions: questionIds?.length || 0,
      questions: questionIds
        ? {
            create: questionIds.map((questionId, index) => ({
              questionId,
              order: index + 1,
            })),
          }
        : undefined,
    },
    include: {
      questions: {
        include: {
          question: true,
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
  });

  return questionnaire;
}

/**
 * Update a questionnaire
 */
export async function updateQuestionnaire(id: string, data: UpdateQuestionnaireDTO) {
  // If updating number, check if it's already taken
  if (data.number !== undefined) {
    const existing = await prisma.questionnaire.findUnique({
      where: { number: data.number },
    });

    if (existing && existing.id !== id) {
      throw new Error(`Questionnaire with number ${data.number} already exists`);
    }
  }

  return await prisma.questionnaire.update({
    where: { id },
    data,
    include: {
      questions: {
        include: {
          question: true,
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
  });
}

/**
 * Delete a questionnaire
 */
export async function deleteQuestionnaire(id: string) {
  return await prisma.questionnaire.delete({
    where: { id },
  });
}

/**
 * Add questions to a questionnaire
 */
export async function addQuestionsToQuestionnaire(
  questionnaireId: string,
  questionIds: string[]
) {
  // Get current max order
  const maxOrder = await prisma.questionnaireQuestion.findFirst({
    where: { questionnaireId },
    orderBy: { order: 'desc' },
    select: { order: true },
  });

  const startOrder = (maxOrder?.order || 0) + 1;

  // Add questions
  await prisma.questionnaireQuestion.createMany({
    data: questionIds.map((questionId, index) => ({
      questionnaireId,
      questionId,
      order: startOrder + index,
    })),
    skipDuplicates: true, // Skip if question already in questionnaire
  });

  // Update total questions count
  const count = await prisma.questionnaireQuestion.count({
    where: { questionnaireId },
  });

  await prisma.questionnaire.update({
    where: { id: questionnaireId },
    data: { totalQuestions: count },
  });

  return await getQuestionnaireById(questionnaireId);
}

/**
 * Remove a question from a questionnaire
 */
export async function removeQuestionFromQuestionnaire(
  questionnaireId: string,
  questionId: string
) {
  await prisma.questionnaireQuestion.deleteMany({
    where: {
      questionnaireId,
      questionId,
    },
  });

  // Update total questions count
  const count = await prisma.questionnaireQuestion.count({
    where: { questionnaireId },
  });

  await prisma.questionnaire.update({
    where: { id: questionnaireId },
    data: { totalQuestions: count },
  });

  return await getQuestionnaireById(questionnaireId);
}

/**
 * Reorder questions in a questionnaire
 */
export async function reorderQuestions(
  questionnaireId: string,
  questionOrders: Array<{ questionId: string; order: number }>
) {
  // Update each question's order
  await Promise.all(
    questionOrders.map(({ questionId, order }) =>
      prisma.questionnaireQuestion.updateMany({
        where: {
          questionnaireId,
          questionId,
        },
        data: { order },
      })
    )
  );

  return await getQuestionnaireById(questionnaireId);
}

/**
 * Get questionnaire statistics
 */
export async function getQuestionnaireStats() {
  const [total, active, inactive, totalQuestions] = await Promise.all([
    prisma.questionnaire.count(),
    prisma.questionnaire.count({ where: { isActive: true } }),
    prisma.questionnaire.count({ where: { isActive: false } }),
    prisma.questionnaireQuestion.count(),
  ]);

  return {
    total,
    active,
    inactive,
    totalQuestionsAcrossAll: totalQuestions,
    averageQuestionsPerQuestionnaire: total > 0 ? totalQuestions / total : 0,
  };
}

/**
 * Check if a question is used in any questionnaire
 */
export async function isQuestionInQuestionnaire(questionId: string): Promise<boolean> {
  const count = await prisma.questionnaireQuestion.count({
    where: { questionId },
  });

  return count > 0;
}

/**
 * Get all questionnaires that contain a specific question
 */
export async function getQuestionnairesWithQuestion(questionId: string) {
  const assignments = await prisma.questionnaireQuestion.findMany({
    where: { questionId },
    include: {
      questionnaire: {
        select: {
          id: true,
          title: true,
          number: true,
        },
      },
    },
  });

  return assignments.map(a => a.questionnaire);
}
