/**
 * Admin Question Service
 * Business logic for admin question management (CRUD operations)
 */

import { Question, QuestionCategory, Difficulty, Prisma } from '@prisma/client';
import { questionRepository } from '../repositories/question.repository';
import { questionService } from './question.service';
import {
  AdminQuestionListFilters,
  CreateQuestionDTO,
  UpdateQuestionDTO,
  QuestionStatsResponse,
  PaginatedResult,
} from '../types';
import { BadRequestError, NotFoundError } from '../utils/errors';

class AdminQuestionService {
  /**
   * List questions with admin filters including search
   * Returns full question data (including correct answers)
   */
  async listQuestions(filters: AdminQuestionListFilters): Promise<PaginatedResult<Question>> {
    const normalizedFilters = {
      category: filters.category,
      difficulty: filters.difficulty,
      questionnaireNumber: filters.questionnaireNumber,
      page: filters.page ?? 1,
      limit: Math.min(filters.limit ?? 20, 100), // Cap at 100
    };

    // If search query exists, we need a different approach
    if (filters.search && filters.search.trim()) {
      return this.searchQuestions(filters.search, normalizedFilters);
    }

    // Use existing repository method
    return questionRepository.findMany(normalizedFilters);
  }

  /**
   * Search questions by questionText
   * Uses ILIKE for case-insensitive PostgreSQL search
   */
  private async searchQuestions(
    searchQuery: string,
    filters: Omit<AdminQuestionListFilters, 'search'>
  ): Promise<PaginatedResult<Question>> {
    const { category, difficulty, questionnaireNumber, page = 1, limit = 20 } = filters;

    // Build where clause
    const where: Record<string, unknown> = {
      questionText: {
        contains: searchQuery,
        mode: 'insensitive', // Case-insensitive search
      },
    };

    if (category) {
      where.category = category;
    }

    if (difficulty) {
      where.difficulty = difficulty;
    }

    if (questionnaireNumber) {
      where.questionnaireNumber = questionnaireNumber;
    }

    // Execute count and find in parallel
    const prisma = (await import('../config/database')).prisma;
    const [total, items] = await Promise.all([
      prisma.question.count({ where }),
      prisma.question.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get single question by ID (admin view includes all fields)
   */
  async getQuestionById(id: string): Promise<Question> {
    const question = await questionRepository.findById(id);

    if (!question) {
      throw new NotFoundError('Question not found');
    }

    return question;
  }

  /**
   * Create a new question
   */
  async createQuestion(data: CreateQuestionDTO): Promise<Question> {
    // Validate input
    this.validateQuestionData(data);

    // Create question
    const question = await questionRepository.create({
      category: data.category,
      difficulty: data.difficulty,
      questionText: data.questionText,
      options: data.options as unknown as Prisma.InputJsonValue,
      correctOptionId: data.correctOptionId,
      explanationText: data.explanationText ?? null,
      questionnaireNumber: data.questionnaireNumber ?? 1,
    });

    // Invalidate question cache
    await questionService.invalidateCache();

    return question;
  }

  /**
   * Update an existing question
   */
  async updateQuestion(id: string, data: UpdateQuestionDTO): Promise<Question> {
    // Check if question exists
    const existingQuestion = await questionRepository.findById(id);
    if (!existingQuestion) {
      throw new NotFoundError('Question not found');
    }

    // Validate update data
    if (Object.keys(data).length === 0) {
      throw new BadRequestError('No fields to update');
    }

    // If updating options or correctOptionId, validate consistency
    if (data.options || data.correctOptionId) {
      const finalOptions = data.options ?? questionRepository.parseOptions(existingQuestion.options);
      const finalCorrectId = data.correctOptionId ?? existingQuestion.correctOptionId;

      const optionIds = finalOptions.map((opt) => opt.id);
      if (!optionIds.includes(finalCorrectId)) {
        throw new BadRequestError('correctOptionId must match one of the option IDs');
      }
    }

    // Update question
    const updatedQuestion = await questionRepository.update(id, {
      ...(data.category && { category: data.category }),
      ...(data.difficulty && { difficulty: data.difficulty }),
      ...(data.questionText && { questionText: data.questionText }),
      ...(data.options && { options: data.options as unknown as Prisma.InputJsonValue }),
      ...(data.correctOptionId && { correctOptionId: data.correctOptionId }),
      ...(data.explanationText !== undefined && { explanationText: data.explanationText }),
      ...(data.questionnaireNumber !== undefined && {
        questionnaireNumber: data.questionnaireNumber,
      }),
    });

    // Invalidate cache
    await questionService.invalidateCache();

    return updatedQuestion;
  }

  /**
   * Delete a question
   * Cascades to UserProgress automatically via Prisma schema
   */
  async deleteQuestion(id: string): Promise<void> {
    // Check if question exists
    const question = await questionRepository.findById(id);
    if (!question) {
      throw new NotFoundError('Question not found');
    }

    // Delete question (cascades to UserProgress)
    await questionRepository.delete(id);

    // Invalidate cache
    await questionService.invalidateCache();
  }

  /**
   * Get question statistics for admin dashboard
   */
  async getQuestionStats(): Promise<QuestionStatsResponse> {
    const prisma = (await import('../config/database')).prisma;

    // Execute all counts in parallel
    const [
      total,
      byCategory,
      byDifficulty,
      withExplanations,
      withAIExplanations,
    ] = await Promise.all([
      prisma.question.count(),
      prisma.question.groupBy({
        by: ['category'],
        _count: true,
      }),
      prisma.question.groupBy({
        by: ['difficulty'],
        _count: true,
      }),
      prisma.question.count({
        where: {
          explanationText: { not: null },
        },
      }),
      prisma.question.count({
        where: {
          aiExplanation: { not: null },
        },
      }),
    ]);

    // Transform grouped results to record
    const byCategoryRecord: Record<QuestionCategory, number> = {
      VERBAL_ABILITY: 0,
      NUMERICAL_ABILITY: 0,
      ANALYTICAL_ABILITY: 0,
      GENERAL_INFORMATION: 0,
      CLERICAL_ABILITY: 0,
    };

    byCategory.forEach((item) => {
      byCategoryRecord[item.category] = item._count;
    });

    const byDifficultyRecord: Record<Difficulty, number> = {
      EASY: 0,
      MEDIUM: 0,
      HARD: 0,
    };

    byDifficulty.forEach((item) => {
      byDifficultyRecord[item.difficulty] = item._count;
    });

    return {
      total,
      byCategory: byCategoryRecord,
      byDifficulty: byDifficultyRecord,
      withExplanations,
      withAIExplanations,
    };
  }

  /**
   * Validate question data
   */
  private validateQuestionData(data: CreateQuestionDTO): void {
    // Question text validation
    if (!data.questionText || data.questionText.trim().length === 0) {
      throw new BadRequestError('Question text is required');
    }

    if (data.questionText.length > 5000) {
      throw new BadRequestError('Question text must not exceed 5000 characters');
    }

    // Options validation
    if (!data.options || !Array.isArray(data.options) || data.options.length < 2) {
      throw new BadRequestError('At least 2 options are required');
    }

    if (data.options.length > 6) {
      throw new BadRequestError('Maximum 6 options allowed');
    }

    // Validate each option has id and text
    for (const option of data.options) {
      if (!option.id || !option.text) {
        throw new BadRequestError('Each option must have an id and text');
      }
    }

    // Validate correctOptionId matches one of the options
    const optionIds = data.options.map((opt) => opt.id);
    if (!optionIds.includes(data.correctOptionId)) {
      throw new BadRequestError('correctOptionId must match one of the option IDs');
    }

    // Validate explanation text length if provided
    if (data.explanationText && data.explanationText.length > 5000) {
      throw new BadRequestError('Explanation text must not exceed 5000 characters');
    }
  }
}

export const adminQuestionService = new AdminQuestionService();
