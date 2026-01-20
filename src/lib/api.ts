// API Client for ReviewGuro Backend

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Types for API responses
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthUser {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  isPremium: boolean;
  premiumExpiry: string | null;
  createdAt: string;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  expiresIn: string;
}

export interface RegisterResponse extends LoginResponse {}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  category: "VERBAL_ABILITY" | "NUMERICAL_ABILITY" | "ANALYTICAL_ABILITY" | "GENERAL_INFORMATION" | "CLERICAL_ABILITY";
  difficulty: "EASY" | "MEDIUM" | "HARD";
  questionText: string;
  options: QuestionOption[];
  hint?: string;
}

export interface SubmitAnswerResponse {
  isCorrect: boolean;
  correctOptionId: string;
  selectedOptionId: string;
  explanation: string;
  pointsEarned: number;
}

export interface ExplanationResponse {
  questionId: string;
  explanation: string;
  source: "database" | "cache" | "ai_generated";
}

export interface HintResponse {
  questionId: string;
  hint: string;
}

export interface UserStats {
  totalAttempts: number;
  correctAnswers: number;
  accuracy: number;
}

export interface CategoryStats {
  category: Question["category"];
  totalAttempts: number;
  correctAnswers: number;
  accuracy: number;
}

export interface DetailedUserStats extends UserStats {
  categoryStats?: CategoryStats[];
}

// New progress endpoint types
export interface CategoryProgress {
  category: Question["category"];
  totalQuestions: number;
  attemptedQuestions: number;
  correctAnswers: number;
  accuracy: number;
  questionsAvailable: number;
}

export interface ProgressResponse {
  categories: CategoryProgress[];
  overallStats: {
    totalAttempts: number;
    correctAnswers: number;
    accuracy: number;
  };
}

// Token management
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("reviewguro_token");
}

export function setAccessToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("reviewguro_token", token);
}

export function removeAccessToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("reviewguro_token");
  localStorage.removeItem("reviewguro_user");
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("reviewguro_user");
  return user ? JSON.parse(user) : null;
}

export function setStoredUser(user: AuthUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("reviewguro_user", JSON.stringify(user));
}

// API Error class
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Generic fetch wrapper with auth
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAccessToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch (error) {
    // Network error - server unreachable
    throw new ApiError(0, "Unable to connect to server. Please check your internet connection and try again.");
  }

  // Check content type before parsing
  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    // Server returned non-JSON response (likely HTML error page)
    if (response.status === 404) {
      throw new ApiError(404, "The requested resource was not found. Please try again later.");
    } else if (response.status === 500) {
      throw new ApiError(500, "Server error. Please try again later.");
    } else if (response.status === 502 || response.status === 503 || response.status === 504) {
      throw new ApiError(response.status, "Server is temporarily unavailable. Please try again later.");
    } else {
      throw new ApiError(response.status, "Server returned an unexpected response. Please try again later.");
    }
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new ApiError(response.status, "Invalid response from server. Please try again later.");
  }

  if (!response.ok) {
    // Handle specific error messages from API
    const errorMessage = data.message || data.error || getErrorMessage(response.status);
    throw new ApiError(response.status, errorMessage, data);
  }

  return data;
}

// Helper to get user-friendly error messages
function getErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return "Invalid request. Please check your input and try again.";
    case 401:
      return "Your session has expired. Please sign in again.";
    case 403:
      return "You don't have permission to perform this action.";
    case 404:
      return "The requested resource was not found.";
    case 409:
      return "This action conflicts with existing data.";
    case 422:
      return "Invalid data provided. Please check your input.";
    case 429:
      return "Too many requests. Please wait a moment and try again.";
    case 500:
      return "Server error. Please try again later.";
    case 502:
    case 503:
    case 504:
      return "Server is temporarily unavailable. Please try again later.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
}

// Auth API
export const authApi = {
  async register(email: string, password: string): Promise<ApiResponse<RegisterResponse>> {
    const response = await fetchApi<ApiResponse<RegisterResponse>>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data.accessToken) {
      setAccessToken(response.data.accessToken);
      setStoredUser(response.data.user);
    }

    return response;
  },

  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    const response = await fetchApi<ApiResponse<LoginResponse>>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data.accessToken) {
      setAccessToken(response.data.accessToken);
      setStoredUser(response.data.user);
    }

    return response;
  },

  async getProfile(): Promise<ApiResponse<AuthUser>> {
    return fetchApi<ApiResponse<AuthUser>>("/auth/me");
  },

  logout(): void {
    removeAccessToken();
  },
};

// Questions API
export interface GetQuestionsParams {
  page?: number;
  limit?: number;
  category?: Question["category"];
  difficulty?: Question["difficulty"];
}

export const questionsApi = {
  async getQuestions(params: GetQuestionsParams = {}): Promise<ApiResponse<Question[]>> {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.set("page", params.page.toString());
    if (params.limit) searchParams.set("limit", params.limit.toString());
    if (params.category) searchParams.set("category", params.category);
    if (params.difficulty) searchParams.set("difficulty", params.difficulty);

    const queryString = searchParams.toString();
    const endpoint = `/questions${queryString ? `?${queryString}` : ""}`;

    return fetchApi<ApiResponse<Question[]>>(endpoint);
  },

  async getQuestionById(id: string): Promise<ApiResponse<Question>> {
    return fetchApi<ApiResponse<Question>>(`/questions/${id}`);
  },
};

// Practice API
export const practiceApi = {
  async submitAnswer(
    questionId: string,
    selectedOptionId: string
  ): Promise<ApiResponse<SubmitAnswerResponse>> {
    return fetchApi<ApiResponse<SubmitAnswerResponse>>("/practice/submit", {
      method: "POST",
      body: JSON.stringify({ questionId, selectedOptionId }),
    });
  },

  async getExplanation(questionId: string): Promise<ApiResponse<ExplanationResponse>> {
    return fetchApi<ApiResponse<ExplanationResponse>>("/practice/explain", {
      method: "POST",
      body: JSON.stringify({ questionId }),
    });
  },

  async getHint(questionId: string): Promise<ApiResponse<HintResponse>> {
    return fetchApi<ApiResponse<HintResponse>>("/practice/hint", {
      method: "POST",
      body: JSON.stringify({ questionId }),
    });
  },

  async getStats(): Promise<ApiResponse<UserStats>> {
    return fetchApi<ApiResponse<UserStats>>("/practice/stats");
  },

  async getDetailedStats(): Promise<ApiResponse<DetailedUserStats>> {
    return fetchApi<ApiResponse<DetailedUserStats>>("/practice/stats?detailed=true");
  },

  async getCategoryStats(category: Question["category"]): Promise<ApiResponse<CategoryStats>> {
    return fetchApi<ApiResponse<CategoryStats>>(`/practice/stats?category=${category}`);
  },

  async getProgressByCategories(): Promise<ApiResponse<ProgressResponse>> {
    return fetchApi<ApiResponse<ProgressResponse>>("/practice/progress/categories");
  },
};

// ==================== MOCK EXAM TYPES ====================

export type ExamStatus = "IN_PROGRESS" | "COMPLETED" | "ABANDONED";

export interface MockExamQuestion {
  id: string;
  category: Question["category"];
  difficulty: Question["difficulty"];
  questionText: string;
  options: QuestionOption[];
}

export interface CreateMockExamRequest {
  totalQuestions: number;
  timeLimitMinutes: number;
  passingScore: number;
  categories: "MIXED" | Question["category"][];
  difficulty?: Question["difficulty"];
}

export interface MockExamData {
  examId: string;
  totalQuestions: number;
  timeLimitMinutes: number;
  passingScore: number;
  status: ExamStatus;
  startedAt: string;
  questions: MockExamQuestion[];
}

export interface ActiveMockExamData extends MockExamData {
  timeRemainingSeconds: number;
  answers: Record<string, string>;
  flaggedQuestions: string[];
  progress: {
    answered: number;
    flagged: number;
    unanswered: number;
  };
}

export interface SaveAnswerResponse {
  examId: string;
  questionId: string;
  selectedOptionId: string;
  progress: {
    answered: number;
    flagged: number;
    unanswered: number;
  };
}

export interface FlagQuestionResponse {
  examId: string;
  questionId: string;
  flagged: boolean;
  flaggedQuestions: string[];
}

export interface ExamAnswerResult {
  questionId: string;
  selectedOptionId: string | null;
  isCorrect: boolean;
  correctOptionId: string;
}

export interface MockExamResultData {
  examId: string;
  score: number;
  passed: boolean;
  passingScore: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  timeSpentMinutes: number;
  answers: ExamAnswerResult[];
}

export interface ExamResultQuestion {
  questionId: string;
  questionText: string;
  selectedOptionId: string | null;
  correctOptionId: string;
  isCorrect: boolean;
  options: QuestionOption[];
  explanation: string;
}

export interface DetailedExamResults extends MockExamResultData {
  completedAt: string;
  questions: ExamResultQuestion[];
}

export interface ExamHistoryItem {
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

export interface ExamHistoryResponse {
  exams: ExamHistoryItem[];
  totalCompleted: number;
  averageScore: number;
  passRate: number;
}

// Mock Exam API
export const mockExamApi = {
  async createExam(params: CreateMockExamRequest): Promise<ApiResponse<MockExamData>> {
    return fetchApi<ApiResponse<MockExamData>>("/mock-exams", {
      method: "POST",
      body: JSON.stringify(params),
    });
  },

  async getExam(examId: string): Promise<ApiResponse<ActiveMockExamData>> {
    return fetchApi<ApiResponse<ActiveMockExamData>>(`/mock-exams/${examId}`);
  },

  async saveAnswer(
    examId: string,
    questionId: string,
    selectedOptionId: string
  ): Promise<ApiResponse<SaveAnswerResponse>> {
    return fetchApi<ApiResponse<SaveAnswerResponse>>(`/mock-exams/${examId}/answers`, {
      method: "POST",
      body: JSON.stringify({ questionId, selectedOptionId }),
    });
  },

  async flagQuestion(
    examId: string,
    questionId: string,
    flagged: boolean
  ): Promise<ApiResponse<FlagQuestionResponse>> {
    return fetchApi<ApiResponse<FlagQuestionResponse>>(`/mock-exams/${examId}/flag`, {
      method: "PATCH",
      body: JSON.stringify({ questionId, flagged }),
    });
  },

  async submitExam(examId: string): Promise<ApiResponse<MockExamResultData>> {
    return fetchApi<ApiResponse<MockExamResultData>>(`/mock-exams/${examId}/submit`, {
      method: "POST",
    });
  },

  async getResults(examId: string): Promise<ApiResponse<DetailedExamResults>> {
    return fetchApi<ApiResponse<DetailedExamResults>>(`/mock-exams/${examId}/results`);
  },

  async getHistory(params?: {
    status?: ExamStatus;
    limit?: number;
  }): Promise<ApiResponse<ExamHistoryResponse>> {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set("status", params.status);
    if (params?.limit) searchParams.set("limit", params.limit.toString());

    const queryString = searchParams.toString();
    const endpoint = `/mock-exams/history${queryString ? `?${queryString}` : ""}`;

    return fetchApi<ApiResponse<ExamHistoryResponse>>(endpoint);
  },

  async abandonExam(examId: string): Promise<ApiResponse<{ examId: string; status: ExamStatus }>> {
    return fetchApi<ApiResponse<{ examId: string; status: ExamStatus }>>(`/mock-exams/${examId}/abandon`, {
      method: "POST",
    });
  },
};

// ==================== ANALYTICS TYPES ====================

export interface DashboardOverview {
  totalQuestions: number;
  accuracy: number;
  studyTime: { hours: number; minutes: number };
  streak: { current: number; longest: number };
  mockExams: { total: number; completed: number; averageScore: number; passRate: number };
}

export interface WeeklyActivityDay {
  date: string;
  day: string;
  questionsAttempted: number;
  correctAnswers: number;
  accuracy: number;
}

export interface WeeklyActivityResponse {
  labels: string[];
  data: WeeklyActivityDay[];
}

export interface StrengthWeaknessCategory {
  category: Question["category"];
  accuracy: number;
  totalAttempted: number;
  recommendation?: string;
}

export interface StrengthsWeaknessesResponse {
  strengths: StrengthWeaknessCategory[];
  weaknesses: StrengthWeaknessCategory[];
}

export interface CategoryPerformance {
  category: Question["category"];
  totalQuestions: number;
  attemptedQuestions: number;
  correctAnswers: number;
  accuracy: number;
  averageTimeSeconds: number;
}

export interface PerformanceByCategoryResponse {
  categories: CategoryPerformance[];
}

export interface AIInsightsResponse {
  overallAssessment: string;
  recommendations: string[];
  focusAreas: Question["category"][];
  encouragement: string;
}

export interface StreakResponse {
  current: number;
  longest: number;
  lastActivityDate: string;
}

export interface TimeTrackingCategory {
  category: Question["category"];
  totalMinutes: number;
  averageSessionMinutes: number;
}

export interface TimeTrackingResponse {
  totalHours: number;
  totalMinutes: number;
  byCategory: TimeTrackingCategory[];
}

export interface AllAnalyticsResponse {
  dashboard: DashboardOverview;
  weeklyActivity: WeeklyActivityResponse;
  strengthsWeaknesses: StrengthsWeaknessesResponse;
  performanceByCategory: PerformanceByCategoryResponse;
  aiInsights: AIInsightsResponse;
  streak: StreakResponse;
  timeTracking: TimeTrackingResponse;
}

// Analytics API
export const analyticsApi = {
  async getDashboard(): Promise<ApiResponse<DashboardOverview>> {
    return fetchApi<ApiResponse<DashboardOverview>>("/analytics/dashboard");
  },

  async getWeeklyActivity(): Promise<ApiResponse<WeeklyActivityResponse>> {
    return fetchApi<ApiResponse<WeeklyActivityResponse>>("/analytics/weekly-activity");
  },

  async getStrengthsWeaknesses(): Promise<ApiResponse<StrengthsWeaknessesResponse>> {
    return fetchApi<ApiResponse<StrengthsWeaknessesResponse>>("/analytics/strengths-weaknesses");
  },

  async getPerformanceByCategory(): Promise<ApiResponse<PerformanceByCategoryResponse>> {
    return fetchApi<ApiResponse<PerformanceByCategoryResponse>>("/analytics/performance-by-category");
  },

  async getAIInsights(): Promise<ApiResponse<AIInsightsResponse>> {
    return fetchApi<ApiResponse<AIInsightsResponse>>("/analytics/ai-insights");
  },

  async getStreak(): Promise<ApiResponse<StreakResponse>> {
    return fetchApi<ApiResponse<StreakResponse>>("/analytics/streak");
  },

  async getTimeTracking(): Promise<ApiResponse<TimeTrackingResponse>> {
    return fetchApi<ApiResponse<TimeTrackingResponse>>("/analytics/time-tracking");
  },

  async getAll(): Promise<ApiResponse<AllAnalyticsResponse>> {
    return fetchApi<ApiResponse<AllAnalyticsResponse>>("/analytics");
  },
};

// Category display names mapping
export const categoryDisplayNames: Record<Question["category"], string> = {
  VERBAL_ABILITY: "Verbal Ability",
  NUMERICAL_ABILITY: "Numerical Ability",
  ANALYTICAL_ABILITY: "Analytical Ability",
  GENERAL_INFORMATION: "General Information",
  CLERICAL_ABILITY: "Clerical Ability",
};

// Difficulty colors mapping
export const difficultyColors: Record<Question["difficulty"], { bg: string; text: string }> = {
  EASY: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-400" },
  MEDIUM: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-400" },
  HARD: { bg: "bg-rose-100 dark:bg-rose-900/30", text: "text-rose-700 dark:text-rose-400" },
};

// ==================== USER PROFILE TYPES ====================

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  examDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  examDate?: string;
}

// Profile API
export const profileApi = {
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    return fetchApi<ApiResponse<UserProfile>>("/users/profile");
  },

  async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<UserProfile>> {
    return fetchApi<ApiResponse<UserProfile>>("/users/profile", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  async uploadPhoto(file: File): Promise<ApiResponse<{ photoUrl: string }>> {
    const formData = new FormData();
    formData.append("photo", file);

    const token = getAccessToken();

    const response = await fetch(`${API_BASE_URL}/users/profile/photo`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Upload failed" }));
      throw new Error(error.message || "Upload failed");
    }

    return response.json();
  },
};

// ==================== SETTINGS TYPES ====================

export type ThemePreference = "light" | "dark" | "system";

export interface AppearanceSettings {
  theme: ThemePreference;
}

export interface StudyPreferences {
  dailyGoal: number;
  showExplanations: boolean;
  soundEffects: boolean;
}

export interface NotificationSettings {
  weeklyProgressReport: boolean;
  examReminders: boolean;
  dailyStudyReminder: boolean;
  reminderTime: string;
  pushNotifications: boolean;
}

export interface UserSettings {
  appearance: AppearanceSettings;
  studyPreferences: StudyPreferences;
  notifications: NotificationSettings;
}

// Settings API
export const settingsApi = {
  async getSettings(): Promise<ApiResponse<UserSettings>> {
    return fetchApi<ApiResponse<UserSettings>>("/users/settings");
  },

  async updateAppearance(data: AppearanceSettings): Promise<ApiResponse<AppearanceSettings>> {
    return fetchApi<ApiResponse<AppearanceSettings>>("/users/settings/appearance", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  async updateDailyGoal(dailyGoal: number): Promise<ApiResponse<{ dailyGoal: number }>> {
    return fetchApi<ApiResponse<{ dailyGoal: number }>>("/users/settings/daily-goal", {
      method: "PATCH",
      body: JSON.stringify({ dailyGoal }),
    });
  },

  async updateStudyPreferences(
    data: Partial<Omit<StudyPreferences, "dailyGoal">>
  ): Promise<ApiResponse<StudyPreferences>> {
    return fetchApi<ApiResponse<StudyPreferences>>("/users/settings/study-preferences", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  async updateNotifications(data: Partial<NotificationSettings>): Promise<ApiResponse<NotificationSettings>> {
    return fetchApi<ApiResponse<NotificationSettings>>("/users/settings/notifications", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
};

// ==================== SECURITY/AUTH TYPES ====================

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface SessionsResponse {
  sessions: Session[];
}

// Security API
export const securityApi = {
  async changePassword(data: ChangePasswordRequest): Promise<ApiResponse<{ message: string }>> {
    return fetchApi<ApiResponse<{ message: string }>>("/auth/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getSessions(): Promise<ApiResponse<SessionsResponse>> {
    return fetchApi<ApiResponse<SessionsResponse>>("/auth/sessions");
  },

  async signOut(): Promise<ApiResponse<{ message: string }>> {
    return fetchApi<ApiResponse<{ message: string }>>("/auth/signout", {
      method: "POST",
    });
  },

  async revokeSession(sessionId: string): Promise<ApiResponse<{ message: string }>> {
    return fetchApi<ApiResponse<{ message: string }>>(`/auth/sessions/${sessionId}`, {
      method: "DELETE",
    });
  },
};

// ==================== SUBSCRIPTION TYPES ====================

export type SubscriptionStatus = "FREE" | "PREMIUM" | "EXPIRED";
export type PaymentMethod = "GCash" | "Maya" | "Card";

export interface Subscription {
  status: SubscriptionStatus;
  plan: string;
  expiresAt?: string;
  startedAt?: string;
  features: string[];
}

export interface PurchaseSubscriptionRequest {
  paymentMethod: PaymentMethod;
  amount: number;
  transactionId: string;
}

// Subscription API
export const subscriptionApi = {
  async getSubscription(): Promise<ApiResponse<Subscription>> {
    return fetchApi<ApiResponse<Subscription>>("/subscription");
  },

  async purchase(data: PurchaseSubscriptionRequest): Promise<ApiResponse<Subscription>> {
    return fetchApi<ApiResponse<Subscription>>("/subscription/purchase", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

// ==================== PAYMENT TYPES (PayMongo Integration) ====================

// PayMongo Checkout Session Types
export interface CreateCheckoutRequest {
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSessionResponse {
  checkoutId: string;
  checkoutUrl: string;
  status: "pending" | "active" | "expired" | "paid";
  expiresAt: string;
}

// Payment API (PayMongo)
export const paymentApi = {
  // Create PayMongo checkout session
  async createCheckout(
    data: CreateCheckoutRequest
  ): Promise<ApiResponse<CheckoutSessionResponse>> {
    return fetchApi<ApiResponse<CheckoutSessionResponse>>("/payments/paymongo/create-checkout", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
