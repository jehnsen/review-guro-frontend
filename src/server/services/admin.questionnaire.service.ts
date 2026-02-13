/**
 * Admin Questionnaire Service
 * Business logic for questionnaire management
 */

import {
  getQuestionnaires,
  getQuestionnaireById,
  getQuestionnaireByNumber,
  createQuestionnaire as createQuestionnaireRepo,
  updateQuestionnaire as updateQuestionnaireRepo,
  deleteQuestionnaire as deleteQuestionnaireRepo,
  addQuestionsToQuestionnaire as addQuestionsRepo,
  removeQuestionFromQuestionnaire as removeQuestionRepo,
  reorderQuestions as reorderQuestionsRepo,
  getQuestionnaireStats,
  isQuestionInQuestionnaire,
  getQuestionnairesWithQuestion,
} from '@/server/repositories/admin.questionnaire.repository';
import {
  AdminQuestionnaireListFilters,
  CreateQuestionnaireDTO,
  UpdateQuestionnaireDTO,
  AddQuestionsToQuestionnaireDTO,
  ReorderQuestionsDTO,
} from '@/server/types/admin';

export class AdminQuestionnaireService {
  /**
   * List all questionnaires with pagination and filters
   */
  static async listQuestionnaires(filters: AdminQuestionnaireListFilters) {
    return await getQuestionnaires(filters);
  }

  /**
   * Get a single questionnaire by ID
   */
  static async getQuestionnaire(id: string) {
    const questionnaire = await getQuestionnaireById(id);

    if (!questionnaire) {
      throw new Error('Questionnaire not found');
    }

    return questionnaire;
  }

  /**
   * Get a questionnaire by number
   */
  static async getQuestionnaireByNumber(number: number) {
    const questionnaire = await getQuestionnaireByNumber(number);

    if (!questionnaire) {
      throw new Error(`Questionnaire #${number} not found`);
    }

    return questionnaire;
  }

  /**
   * Create a new questionnaire
   */
  static async createQuestionnaire(data: CreateQuestionnaireDTO) {
    // Validate data
    this.validateQuestionnaireData(data);

    try {
      const questionnaire = await createQuestionnaireRepo(data);
      return questionnaire;
    } catch (error) {
      if (error instanceof Error && error.message.includes('already exists')) {
        throw error;
      }
      throw new Error('Failed to create questionnaire');
    }
  }

  /**
   * Update a questionnaire
   */
  static async updateQuestionnaire(id: string, data: UpdateQuestionnaireDTO) {
    // Check if questionnaire exists
    const existing = await getQuestionnaireById(id);
    if (!existing) {
      throw new Error('Questionnaire not found');
    }

    // Validate data
    if (data.title || data.description || data.number !== undefined) {
      this.validateQuestionnaireData(data as any);
    }

    try {
      return await updateQuestionnaireRepo(id, data);
    } catch (error) {
      if (error instanceof Error && error.message.includes('already exists')) {
        throw error;
      }
      throw new Error('Failed to update questionnaire');
    }
  }

  /**
   * Delete a questionnaire
   */
  static async deleteQuestionnaire(id: string) {
    // Check if questionnaire exists
    const existing = await getQuestionnaireById(id);
    if (!existing) {
      throw new Error('Questionnaire not found');
    }

    try {
      await deleteQuestionnaireRepo(id);
      return { success: true, message: 'Questionnaire deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete questionnaire');
    }
  }

  /**
   * Add questions to a questionnaire
   */
  static async addQuestions(questionnaireId: string, data: AddQuestionsToQuestionnaireDTO) {
    // Check if questionnaire exists
    const existing = await getQuestionnaireById(questionnaireId);
    if (!existing) {
      throw new Error('Questionnaire not found');
    }

    if (!data.questionIds || data.questionIds.length === 0) {
      throw new Error('At least one question ID is required');
    }

    try {
      return await addQuestionsRepo(questionnaireId, data.questionIds);
    } catch (error) {
      throw new Error('Failed to add questions to questionnaire');
    }
  }

  /**
   * Remove a question from a questionnaire
   */
  static async removeQuestion(questionnaireId: string, questionId: string) {
    // Check if questionnaire exists
    const existing = await getQuestionnaireById(questionnaireId);
    if (!existing) {
      throw new Error('Questionnaire not found');
    }

    try {
      return await removeQuestionRepo(questionnaireId, questionId);
    } catch (error) {
      throw new Error('Failed to remove question from questionnaire');
    }
  }

  /**
   * Reorder questions in a questionnaire
   */
  static async reorderQuestions(questionnaireId: string, data: ReorderQuestionsDTO) {
    // Check if questionnaire exists
    const existing = await getQuestionnaireById(questionnaireId);
    if (!existing) {
      throw new Error('Questionnaire not found');
    }

    if (!data.questionOrders || data.questionOrders.length === 0) {
      throw new Error('Question orders are required');
    }

    try {
      return await reorderQuestionsRepo(questionnaireId, data.questionOrders);
    } catch (error) {
      throw new Error('Failed to reorder questions');
    }
  }

  /**
   * Get questionnaire statistics
   */
  static async getStatistics() {
    return await getQuestionnaireStats();
  }

  /**
   * Check if a question is used in any questionnaire
   */
  static async isQuestionUsed(questionId: string) {
    return await isQuestionInQuestionnaire(questionId);
  }

  /**
   * Get all questionnaires that contain a specific question
   */
  static async getQuestionnairesWithQuestion(questionId: string) {
    return await getQuestionnairesWithQuestion(questionId);
  }

  /**
   * Validate questionnaire data
   */
  private static validateQuestionnaireData(data: Partial<CreateQuestionnaireDTO>) {
    const errors: string[] = [];

    if (data.title !== undefined) {
      if (!data.title || data.title.trim().length === 0) {
        errors.push('Title is required');
      } else if (data.title.length > 200) {
        errors.push('Title must be less than 200 characters');
      }
    }

    if (data.number !== undefined) {
      if (!Number.isInteger(data.number) || data.number < 1) {
        errors.push('Number must be a positive integer');
      }
    }

    if (data.timeLimit !== undefined && data.timeLimit !== null) {
      if (!Number.isInteger(data.timeLimit) || data.timeLimit < 1) {
        errors.push('Time limit must be a positive integer (minutes)');
      }
    }

    if (data.passingScore !== undefined && data.passingScore !== null) {
      if (!Number.isInteger(data.passingScore) || data.passingScore < 0 || data.passingScore > 100) {
        errors.push('Passing score must be between 0 and 100');
      }
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }
}
