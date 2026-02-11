/**
 * Question Repository
 * Data access layer for Question entity
 */

import { Question, Prisma, Difficulty, QuestionCategory } from '@prisma/client';
import { prisma } from '../config/database';
import { QuestionFilters, PaginatedResult, QuestionOption } from '../types';

class QuestionRepository {
  /**
   * Find question by ID
   */
  async findById(id: string): Promise<Question | null> {
    return prisma.question.findUnique({
      where: { id },
    });
  }

  /**
   * Find questions with pagination and filters
   */
  async findMany(filters: QuestionFilters): Promise<PaginatedResult<Question>> {
    const { category, difficulty, questionnaireNumber, page = 1, limit = 10 } = filters;

    // Build where clause dynamically
    const where: Prisma.QuestionWhereInput = {};

    if (category) {
      where.category = category;
    }

    if (difficulty) {
      where.difficulty = difficulty;
    }

    if (questionnaireNumber) {
      where.questionnaireNumber = questionnaireNumber;
    }

    // Execute count and findMany in parallel for efficiency
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
   * Create a new question
   */
  async create(data: Prisma.QuestionCreateInput): Promise<Question> {
    return prisma.question.create({
      data,
    });
  }

  /**
   * Update question by ID
   */
  async update(id: string, data: Prisma.QuestionUpdateInput): Promise<Question> {
    return prisma.question.update({
      where: { id },
      data,
    });
  }

  /**
   * Update AI explanation for a question
   */
  async updateAIExplanation(id: string, explanation: string): Promise<Question> {
    return prisma.question.update({
      where: { id },
      data: { aiExplanation: explanation },
    });
  }

  /**
   * Delete question by ID
   */
  async delete(id: string): Promise<Question> {
    return prisma.question.delete({
      where: { id },
    });
  }

  /**
   * Get random questions for practice
   */
  async getRandomQuestions(
    count: number,
    filters?: { category?: QuestionCategory; difficulty?: Difficulty; questionnaireNumber?: number }
  ): Promise<Question[]> {
    const where: Prisma.QuestionWhereInput = {};

    if (filters?.category) {
      where.category = filters.category;
    }

    if (filters?.difficulty) {
      where.difficulty = filters.difficulty;
    }

    if (filters?.questionnaireNumber) {
      where.questionnaireNumber = filters.questionnaireNumber;
    }

    // Get total count matching filters
    const total = await prisma.question.count({ where });

    if (total === 0) {
      return [];
    }

    // Generate random skip value
    const skip = Math.max(0, Math.floor(Math.random() * (total - count)));

    return prisma.question.findMany({
      where,
      skip,
      take: count,
    });
  }

  /**
   * Find random questions with multiple category support
   * Used for mock exams
   *
   * PERFORMANCE OPTIMIZATION:
   * Instead of fetching all 50,000+ questions into memory and shuffling,
   * we use a two-phase approach:
   * 1. Get total count matching filters
   * 2. Generate random offsets and fetch questions at those positions
   *
   * This reduces memory usage from O(n) to O(count) and eliminates
   * expensive in-memory sorting operations
   */
  async findRandom(
    count: number,
    filters?: {
      categories?: QuestionCategory[];
      difficulty?: Difficulty;
      questionnaireNumber?: number;
    }
  ): Promise<Question[]> {
    const where: Prisma.QuestionWhereInput = {};

    if (filters?.categories && filters.categories.length > 0) {
      where.category = {
        in: filters.categories,
      };
    }

    if (filters?.difficulty) {
      where.difficulty = filters.difficulty;
    }

    if (filters?.questionnaireNumber) {
      where.questionnaireNumber = filters.questionnaireNumber;
    }

    // Phase 1: Get total count matching filters
    const total = await prisma.question.count({ where });

    if (total === 0) {
      return [];
    }

    if (total <= count) {
      // If total questions <= requested count, just return all of them
      return prisma.question.findMany({ where });
    }

    // Phase 2: Generate random unique indices using Fisher-Yates sampling
    const indices = this.generateRandomIndices(total, count);

    // Phase 3: Fetch questions using multiple queries with skip/take
    // This is more efficient than ORDER BY RANDOM() which scans the entire table
    const questions = await Promise.all(
      indices.map((index) =>
        prisma.question.findMany({
          where,
          skip: index,
          take: 1,
        })
      )
    );

    // Flatten results (each query returns array of 1 question)
    return questions.flat();
  }

  /**
   * Generate N unique random indices from range [0, max)
   * Uses Fisher-Yates partial shuffle algorithm
   * Time complexity: O(count), Space complexity: O(count)
   */
  private generateRandomIndices(max: number, count: number): number[] {
    const indices = new Set<number>();

    // For small counts relative to max, random sampling is efficient
    // For large counts (>50% of max), we'd use different strategy
    while (indices.size < count) {
      const randomIndex = Math.floor(Math.random() * max);
      indices.add(randomIndex);
    }

    return Array.from(indices);
  }

  /**
   * Find questions by array of IDs
   * Used for retrieving mock exam questions
   */
  async findByIds(ids: string[]): Promise<Question[]> {
    return prisma.question.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  /**
   * Find questions using smart priority system for practice mode
   *
   * Priority tiers:
   * - Tier 0: Unanswered questions (user has never attempted)
   * - Tier 1: Incorrectly answered (user got wrong previously)
   * - Tier 2: Correctly answered (user already mastered, oldest first)
   *
   * Within each tier, questions are randomized via PostgreSQL RANDOM()
   */
  async findSmartPracticeQuestions(
    userId: string,
    limit: number,
    filters?: {
      category?: QuestionCategory;
      difficulty?: Difficulty;
      questionnaireNumber?: number;
    }
  ): Promise<Question[]> {
    const categoryFilter = filters?.category ?? null;
    const difficultyFilter = filters?.difficulty ?? null;
    const questionnaireFilter = filters?.questionnaireNumber ?? null;

    const rows = await prisma.$queryRaw<Array<Record<string, unknown>>>`
      SELECT q.id, q.category, q.difficulty, q.question_text, q.options,
             q.correct_option_id, q.explanation_text, q.ai_explanation,
             q.questionnaire_number, q.created_at, q.updated_at,
             CASE
               WHEN up.id IS NULL THEN 0
               WHEN up.is_correct = false THEN 1
               ELSE 2
             END AS priority_tier
      FROM questions q
      LEFT JOIN user_progress up ON q.id = up.question_id AND up.user_id = ${userId}::uuid
      WHERE (${categoryFilter}::text IS NULL OR q.category::text = ${categoryFilter})
        AND (${difficultyFilter}::text IS NULL OR q.difficulty::text = ${difficultyFilter})
        AND (${questionnaireFilter}::int IS NULL OR q.questionnaire_number = ${questionnaireFilter})
      ORDER BY priority_tier ASC, RANDOM()
      LIMIT ${limit}
    `;

    return rows.map((row) => this.mapRawToQuestion(row));
  }

  /**
   * Fetch all questions from a specific questionnaire, shuffled
   * Used for questionnaire-based mock exams
   */
  async findByQuestionnaire(questionnaireNumber: number): Promise<Question[]> {
    const questions = await prisma.question.findMany({
      where: { questionnaireNumber },
    });

    // Fisher-Yates shuffle
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    return questions;
  }

  /**
   * Fetch random questions maintaining proportional category distribution
   * Used for MIXED mock exams to guarantee realistic CSC exam format
   *
   * e.g., 50 total → ~12 verbal, ~12 numerical, ~9 analytical, ~9 general, ~8 clerical
   */
  async findRandomWithDistribution(
    totalCount: number,
    distribution: Record<QuestionCategory, number>,
    filters?: { difficulty?: Difficulty }
  ): Promise<Question[]> {
    const totalWeight = Object.values(distribution).reduce((a, b) => a + b, 0);
    const entries = Object.entries(distribution) as [QuestionCategory, number][];

    // Calculate proportional counts
    let allocated = 0;
    const categoryCounts: [QuestionCategory, number][] = entries.map(([category, weight], i) => {
      if (i === entries.length - 1) {
        return [category, totalCount - allocated];
      }
      const count = Math.round((weight / totalWeight) * totalCount);
      allocated += count;
      return [category, count];
    });

    // Fetch from each category in parallel
    const categoryQuestions = await Promise.all(
      categoryCounts.map(([category, count]) =>
        this.findRandom(count, {
          categories: [category],
          difficulty: filters?.difficulty,
        })
      )
    );

    const allQuestions = categoryQuestions.flat();

    // Final shuffle to mix categories
    for (let i = allQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
    }

    return allQuestions;
  }

  /**
   * Map raw SQL row to Question type
   */
  private mapRawToQuestion(row: Record<string, unknown>): Question {
    // Parse options properly whether it's a string or already parsed
    const rawOptions = typeof row.options === 'string' ? JSON.parse(row.options) : row.options;

    return {
      id: String(row.id),
      category: String(row.category) as QuestionCategory,
      difficulty: String(row.difficulty) as Difficulty,
      questionText: String(row.question_text),
      options: rawOptions,
      correctOptionId: String(row.correct_option_id),
      explanationText: row.explanation_text ? String(row.explanation_text) : null,
      aiExplanation: row.ai_explanation ? String(row.ai_explanation) : null,
      questionnaireNumber: Number(row.questionnaire_number),
      createdAt: new Date(row.created_at as string),
      updatedAt: new Date(row.updated_at as string),
    } as Question;
  }

  /**
   * Parse options from JSON to typed array
   */
  parseOptions(options: Prisma.JsonValue): QuestionOption[] {
    if (!Array.isArray(options)) {
      return [];
    }

    return options.map((opt) => {
      // Handle both object and non-object cases
      if (typeof opt !== 'object' || opt === null) {
        return {
          id: '',
          text: String(opt ?? ''),
        };
      }

      const option = opt as { id?: string; text?: string };
      return {
        id: String(option.id ?? ''),
        text: String(option.text ?? ''),
      };
    });
  }
}

export const questionRepository = new QuestionRepository();
