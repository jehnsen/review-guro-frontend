/**
 * Admin Panel Type Definitions
 * Types specific to admin-only operations (question & user management)
 */

import { QuestionCategory, Difficulty, UserRole, SubscriptionStatus } from '@prisma/client';
import { QuestionOption, SafeUser } from './index';

// ============================================
// Admin Question Management Types
// ============================================

/**
 * Filters for admin question list with search capability
 */
export interface AdminQuestionListFilters {
  category?: QuestionCategory;
  difficulty?: Difficulty;
  questionnaireNumber?: number;
  search?: string; // Search in questionText
  page?: number;
  limit?: number;
}

/**
 * DTO for creating a new question
 */
export interface CreateQuestionDTO {
  category: QuestionCategory;
  difficulty: Difficulty;
  questionText: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanationText?: string;
  questionnaireNumber?: number;
}

/**
 * DTO for updating an existing question (all fields optional)
 */
export interface UpdateQuestionDTO {
  category?: QuestionCategory;
  difficulty?: Difficulty;
  questionText?: string;
  options?: QuestionOption[];
  correctOptionId?: string;
  explanationText?: string;
  questionnaireNumber?: number;
}

/**
 * DTO for bulk delete operations (Phase 2 - Future)
 */
export interface BulkDeleteDTO {
  questionIds: string[];
}

/**
 * Question statistics for admin dashboard
 */
export interface QuestionStatsResponse {
  total: number;
  byCategory: Record<QuestionCategory, number>;
  byDifficulty: Record<Difficulty, number>;
  withExplanations: number;
  withAIExplanations: number;
}

// ============================================
// Admin User Management Types
// ============================================

/**
 * Filters for admin user list with search capability
 */
export interface AdminUserListFilters {
  role?: UserRole;
  isPremium?: boolean;
  emailVerified?: boolean;
  search?: string; // Search by email or name
  page?: number;
  limit?: number;
}

/**
 * Extended user response for admin with additional statistics
 */
export interface AdminUserResponse extends SafeUser {
  // Activity stats
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: Date | null;

  // Question stats
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;

  // Mock exam stats
  totalMockExams: number;

  // Timestamps
  updatedAt: Date;
}

/**
 * DTO for granting or revoking Season Pass
 */
export interface GrantSubscriptionDTO {
  isPremium: boolean;
  premiumExpiry?: Date | null; // null = unlimited, undefined = keep existing
}

/**
 * DTO for changing user role
 */
export interface ChangeUserRoleDTO {
  role: UserRole;
}

/**
 * DTO for updating user profile (admin can modify more fields)
 */
export interface AdminUpdateUserDTO {
  firstName?: string;
  lastName?: string;
  examDate?: string | null;
  emailVerified?: boolean; // Admin can force verify
}

/**
 * User activity history response
 */
export interface UserActivityResponse {
  // Practice history
  practiceHistory: Array<{
    date: Date;
    questionsAnswered: number;
    correctAnswers: number;
    accuracy: number;
  }>;

  // Mock exam history
  mockExamHistory: Array<{
    examId: string;
    completedAt: Date;
    totalQuestions: number;
    score: number;
    passed: boolean;
  }>;
}

/**
 * Detailed user information for admin view
 */
export interface AdminUserDetailsResponse {
  user: AdminUserResponse;

  stats: {
    totalQuestions: number;
    correctAnswers: number;
    accuracy: number;
    totalMockExams: number;
    completedMockExams: number;
    averageMockScore: number;
    currentStreak: number;
    longestStreak: number;
  };

  subscription: {
    id?: string;
    status: SubscriptionStatus;
    purchaseDate: Date | null;
    expiresAt: Date | null;
  } | null;
}

/**
 * Platform-wide user statistics for admin dashboard
 */
export interface UserStatsOverview {
  totalUsers: number;
  premiumUsers: number;
  freeUsers: number;
  adminUsers: number;
  verifiedUsers: number;
  unverifiedUsers: number;
  activeToday: number;
  activeThisWeek: number;
  activeThisMonth: number;
}

// ============================================
// Admin Validation Types
// ============================================

/**
 * Validation error for admin forms
 */
export interface AdminValidationError {
  field: string;
  message: string;
}

// ============================================
// Payment & Subscription Management Types
// ============================================

/**
 * Payment list filters
 */
export interface AdminPaymentFilters {
  page?: number;
  limit?: number;
  status?: string;
  provider?: string;
  userId?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

/**
 * Extended payment response for admin
 */
export interface AdminPaymentResponse {
  id: string;
  userId: string;
  user: {
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
  amount: number;
  currency: string;
  provider: string;
  providerPaymentId: string | null;
  status: string;
  description: string | null;
  metadata: any;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Subscription statistics
 */
export interface SubscriptionStatistics {
  total: number;
  active: number;
  expired: number;
  totalRevenue: number;
  monthlyRevenue: number;
  averageSubscriptionValue: number;
  revenueByMonth: {
    month: string;
    revenue: number;
    count: number;
  }[];
}

/**
 * Payment reconciliation data
 */
export interface PaymentReconciliation {
  totalPayments: number;
  successfulPayments: number;
  failedPayments: number;
  pendingPayments: number;
  totalRevenue: number;
  refundedAmount: number;
}

/**
 * Refund request DTO
 */
export interface RefundRequestDTO {
  reason?: string;
}

// ============================================
// Analytics Dashboard Types
// ============================================

/**
 * Platform-wide statistics
 */
export interface PlatformStatistics {
  users: {
    total: number;
    premium: number;
    free: number;
    active: number;
    newThisMonth: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    growth: number;
  };
  questions: {
    total: number;
    byCategory: {
      category: string;
      count: number;
    }[];
    byDifficulty: {
      difficulty: string;
      count: number;
    }[];
  };
  activity: {
    totalPracticeQuestions: number;
    totalMockExams: number;
    mockExamsCompleted: number;
    completionRate: number;
  };
}

/**
 * Question performance metrics
 */
export interface QuestionPerformanceMetrics {
  questionId: string;
  questionText: string;
  category: string;
  difficulty: string;
  totalAttempts: number;
  correctAttempts: number;
  accuracyRate: number;
  averageTimeSeconds: number;
}

/**
 * User engagement trends
 */
export interface UserEngagementTrends {
  dailyActiveUsers: {
    date: string;
    count: number;
  }[];
  weeklyActiveUsers: {
    week: string;
    count: number;
  }[];
  practiceQuestionsPerDay: {
    date: string;
    count: number;
  }[];
  mockExamsPerDay: {
    date: string;
    count: number;
  }[];
}

/**
 * Revenue chart data
 */
export interface RevenueChartData {
  daily: {
    date: string;
    revenue: number;
    count: number;
  }[];
  monthly: {
    month: string;
    revenue: number;
    count: number;
  }[];
  byPaymentMethod: {
    method: string;
    revenue: number;
    count: number;
  }[];
}

/**
 * Response for validation failures
 */
export interface AdminValidationResponse {
  success: false;
  message: string;
  errors: AdminValidationError[];
}

// ============================================
// Questionnaire Management Types
// ============================================

/**
 * Questionnaire with question details
 */
export interface QuestionnaireWithQuestions {
  id: string;
  title: string;
  description: string | null;
  number: number;
  isActive: boolean;
  totalQuestions: number;
  difficulty: Difficulty | null;
  timeLimit: number | null;
  passingScore: number | null;
  createdAt: Date;
  updatedAt: Date;
  questions: QuestionnaireQuestionDetail[];
}

/**
 * Question detail within a questionnaire
 */
export interface QuestionnaireQuestionDetail {
  id: string;
  order: number;
  questionId: string;
  questionText: string;
  category: QuestionCategory;
  difficulty: Difficulty;
  options: QuestionOption[];
  correctOptionId: string;
  explanationText: string | null;
}

/**
 * Filters for questionnaire list
 */
export interface AdminQuestionnaireListFilters {
  isActive?: boolean;
  difficulty?: Difficulty;
  search?: string; // Search in title
  page?: number;
  limit?: number;
}

/**
 * DTO for creating a questionnaire
 */
export interface CreateQuestionnaireDTO {
  title: string;
  description?: string;
  number: number;
  isActive?: boolean;
  difficulty?: Difficulty;
  timeLimit?: number;
  passingScore?: number;
  questionIds?: string[]; // Initial questions to add
}

/**
 * DTO for updating a questionnaire
 */
export interface UpdateQuestionnaireDTO {
  title?: string;
  description?: string;
  number?: number;
  isActive?: boolean;
  difficulty?: Difficulty;
  timeLimit?: number;
  passingScore?: number;
}

/**
 * DTO for adding questions to questionnaire
 */
export interface AddQuestionsToQuestionnaireDTO {
  questionIds: string[];
}

/**
 * DTO for reordering questions in questionnaire
 */
export interface ReorderQuestionsDTO {
  questionOrders: Array<{
    questionId: string;
    order: number;
  }>;
}

/**
 * Questionnaire statistics
 */
export interface QuestionnaireStatsResponse {
  total: number;
  active: number;
  inactive: number;
  totalQuestionsAcrossAll: number;
  averageQuestionsPerQuestionnaire: number;
}
