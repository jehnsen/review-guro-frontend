/**
 * Unified Type Definitions for ReviewGuro
 * Combines backend API types with frontend types
 * Strictly typed - No `any` types allowed
 */

import { UserRole, Difficulty, QuestionCategory, ExamStatus, SubscriptionStatus } from '@prisma/client';

// Re-export Prisma enums for convenience
export { UserRole, Difficulty, QuestionCategory, ExamStatus, SubscriptionStatus };

// ============================================
// API Response Types
// ============================================

export interface APIResponse<T = null> {
  success: boolean;
  message: string;
  data: T;
  meta?: ResponseMeta;
}

export interface ResponseMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  cached?: boolean;
  cacheKey?: string;
}

// ============================================
// Authentication Types
// ============================================

export interface RegisterDTO {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  user: SafeUser;
  accessToken: string;
  refreshToken?: string;
  expiresIn: string;
}

export interface SafeUser {
  id: string;
  email: string;
  role: UserRole;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  isPremium: boolean;
  premiumExpiry: Date | null;
  examDate: Date | null;
  createdAt: Date;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

// ============================================
// Question Types
// ============================================

export interface QuestionOption {
  id: string;
  text: string;
  label?: string; // A, B, C, D
}

export interface QuestionFilters {
  category?: QuestionCategory;
  difficulty?: Difficulty;
  page?: number;
  limit?: number;
  tags?: string[];
}

export interface QuestionResponse {
  id: string;
  category: QuestionCategory;
  difficulty: Difficulty;
  questionText: string;
  options: QuestionOption[];
  correctOptionId?: string; // Only included for completed attempts
  explanationText?: string | null;
  aiExplanation?: string;
  hint?: string | null;
  tags?: string[];
}

export interface QuestionWithAnswer extends QuestionResponse {
  correctOptionId: string;
  explanationText: string | null;
}

// ============================================
// Practice/Interaction Types
// ============================================

export interface SubmitAnswerDTO {
  questionId: string;
  selectedOptionId: string;
  timeSpentSeconds?: number;
}

export interface SubmitAnswerResponse {
  isCorrect: boolean;
  correctOptionId: string;
  selectedOptionId: string;
  explanation: string | null;
  pointsEarned: number;
  streakUpdated?: boolean;
  newStreak?: number;
}

export interface ExplainRequestDTO {
  questionId: string;
  customPrompt?: string;
}

export interface ExplainResponse {
  questionId: string;
  explanation: string;
  source: 'database' | 'cache' | 'ai_generated';
  remainingExplanations?: number;
}

export interface HintRequestDTO {
  questionId: string;
}

export interface HintResponse {
  questionId: string;
  hint: string;
}

// ============================================
// Progress & Statistics Types
// ============================================

export interface CategoryProgress {
  category: QuestionCategory;
  totalQuestions: number;
  attemptedQuestions: number;
  correctAnswers: number;
  accuracy: number;
  questionsAvailable: number;
  averageTime?: number;
}

export interface CategoryProgressResponse {
  categories: CategoryProgress[];
  overallStats: {
    totalAttempts: number;
    correctAnswers: number;
    accuracy: number;
  };
}

export interface UserStats {
  totalAttempts: number;
  correctAnswers: number;
  accuracy: number;
  currentStreak: number;
  longestStreak: number;
  totalStudyMinutes: number;
  questionsAnswered: number;
  weakestCategory?: QuestionCategory;
  strongestCategory?: QuestionCategory;
}

export interface DetailedStatsResponse extends UserStats {
  categoryBreakdown: CategoryProgress[];
  recentActivity: DailyProgress[];
  weeklyActivity: WeeklyActivity;
}

// ============================================
// Mock Exam Types
// ============================================

export interface CreateMockExamDTO {
  totalQuestions: number;
  timeLimitMinutes: number;
  passingScore: number;
  categories: QuestionCategory[] | 'MIXED';
  difficulty?: Difficulty;
}

export interface MockExamSession {
  id: string;
  userId: string;
  totalQuestions: number;
  timeLimitMinutes: number;
  passingScore: number;
  categories: string; // JSON stringified
  difficulty: Difficulty | null;
  status: ExamStatus;
  startedAt: Date;
  completedAt: Date | null;
  timeRemainingSeconds: number | null;
  questions: string; // JSON stringified
  answers: string; // JSON stringified
  flaggedQuestions: string; // JSON stringified
  score: number | null;
}

export interface MockExamAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  correctOptionId: string;
  explanation?: string;
}

export interface SubmitMockExamAnswerDTO {
  examId: string;
  questionId: string;
  selectedOptionId: string;
}

export interface FlagQuestionDTO {
  examId: string;
  questionId: string;
  flagged: boolean;
}

export interface CompleteMockExamResponse {
  examId: string;
  score: number;
  passed: boolean;
  passingScore: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  timeSpentMinutes: number;
  answers: MockExamAnswer[];
}

export interface GetMockExamResponse {
  examId: string;
  status: ExamStatus;
  totalQuestions: number;
  timeLimitMinutes: number;
  passingScore: number;
  timeRemainingSeconds: number;
  startedAt: Date;
  questions: QuestionResponse[];
  answers: Record<string, string>;
  flaggedQuestions: string[];
  progress: {
    answered: number;
    flagged: number;
    unanswered: number;
  };
}

export interface MockExamResponse {
  examId: string;
  totalQuestions: number;
  timeLimitMinutes: number;
  passingScore: number;
  status: ExamStatus;
  startedAt: string;
  questions: QuestionResponse[];
}

export interface MockExamResultsResponse {
  examId: string;
  score: number;
  passed: boolean;
  passingScore: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  timeSpentMinutes: number;
  completedAt: string;
  questions: Array<{
    questionId: string;
    questionText: string;
    selectedOptionId: string | null;
    correctOptionId: string;
    isCorrect: boolean;
    options: QuestionOption[];
    explanation: string;
  }>;
}

export interface MockExamHistoryItem {
  examId: string;
  totalQuestions: number;
  timeLimitMinutes: number;
  passingScore: number;
  categories: string;
  status: ExamStatus;
  score: number | null;
  passed: boolean | null;
  startedAt: string;
  completedAt: string | null;
}

export interface MockExamHistoryResponse {
  exams: MockExamHistoryItem[];
  totalCompleted: number;
  averageScore: number;
  passRate: number;
}

// ============================================
// Analytics Types
// ============================================

export interface DailyProgress {
  date: string;
  questionsAnswered: number;
  correctAnswers: number;
  studyTimeMinutes: number;
  accuracy: number;
}

export interface WeeklyActivity {
  weekStart: string;
  weekEnd: string;
  totalQuestions: number;
  totalCorrect: number;
  totalStudyMinutes: number;
  dailyBreakdown: DailyProgress[];
}

export interface StrengthWeakness {
  category: QuestionCategory;
  accuracy: number;
  totalAttempts: number;
  isStrength: boolean;
}

export interface StrengthsWeaknessesResponse {
  strengths: StrengthWeakness[];
  weaknesses: StrengthWeakness[];
}

export interface CategoryPerformance {
  category: QuestionCategory;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  averageTimeSeconds: number;
  trend: 'improving' | 'declining' | 'stable';
}

export interface DashboardOverview {
  totalQuestions: number;
  accuracy: number;
  studyTime: number;
  streak: number;
  mockExams: {
    total: number;
    passed: number;
    averageScore: number;
  };
  recentActivity: DailyProgress[];
}

export interface StreakResponse {
  current: number;
  longest: number;
  lastActivityDate: Date | null;
  canRepair: boolean;
  missedDays: number;
  repairCost: number;
}

export interface AIInsight {
  type: 'strength' | 'weakness' | 'suggestion' | 'milestone';
  title: string;
  description: string;
  category?: QuestionCategory;
  priority: 'high' | 'medium' | 'low';
}

export interface TimeTrackingResponse {
  totalMinutes: number;
  averageSessionMinutes: number;
  peakStudyHour: number;
  studyDaysThisWeek: number;
  studyDaysThisMonth: number;
}

export interface LimitsResponse {
  dailyPractice: {
    used: number;
    limit: number;
    remaining: number;
    resetsAt: Date;
  };
  explanations: {
    used: number;
    limit: number;
    remaining: number;
    resetsAt: Date;
  };
  mockExams: {
    used: number;
    limit: number;
    remaining: number;
  };
}

// ============================================
// User Profile & Settings Types
// ============================================

export interface UpdateProfileDTO {
  firstName?: string;
  lastName?: string;
  examDate?: string;
}

export interface UpdateAppearanceDTO {
  darkMode: boolean;
}

export interface UpdateDailyGoalDTO {
  dailyGoal: number;
}

export interface UpdateStudyPreferencesDTO {
  dailyGoal?: number;
  studyReminderEnabled?: boolean;
}

export interface UpdateNotificationsDTO {
  emailNotifications: boolean;
  studyReminderEnabled: boolean;
}

// ============================================
// Subscription Types
// ============================================

export interface Subscription {
  id: string;
  userId: string;
  status: SubscriptionStatus;
  plan: string;
  startedAt: Date | null;
  expiresAt: Date | null;
  autoRenew: boolean;
  features: {
    unlimitedPractice: boolean;
    aiTutoring: boolean;
    mockExams: boolean;
    analytics: boolean;
  };
}

export interface PurchaseSubscriptionDTO {
  plan: 'SEASON_PASS';
  paymentMethodId?: string;
}

// ============================================
// Payment Types
// ============================================

export interface CreateCheckoutDTO {
  plan: 'SEASON_PASS';
  successUrl?: string;
  cancelUrl?: string;
}

export interface CheckoutResponse {
  checkoutUrl: string;
  sessionId: string;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  provider: string;
  providerPaymentId: string | null;
  status: string;
  description: string | null;
  createdAt: Date;
}

// ============================================
// Cache Types
// ============================================

export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  prefix?: string;
}

export interface CachedData<T> {
  data: T;
  cachedAt: number;
  ttl: number;
}

// ============================================
// Pagination Types
// ============================================

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// Error Types
// ============================================

export interface AppErrorDetails {
  code: string;
  field?: string;
  message: string;
}

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string,
    public details?: AppErrorDetails[]
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// ============================================
// Request Types (Next.js Extensions)
// ============================================

export interface AuthenticatedRequest {
  user: AuthTokenPayload;
}
