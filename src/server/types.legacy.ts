// Question Types
export type QuestionCategory =
  | "numerical-reasoning"
  | "verbal-reasoning"
  | "analytical-ability"
  | "general-information"
  | "clerical-operations";

export type QuestionDifficulty = "easy" | "medium" | "hard";

export interface QuestionOption {
  id: string;
  label: string; // A, B, C, D
  text: string;
}

export interface Question {
  id: string;
  category: QuestionCategory;
  difficulty: QuestionDifficulty;
  text: string;
  options: QuestionOption[];
  correctAnswerId: string;
  explanation: string;
  hint?: string;
  tags?: string[];
  createdAt: string;
}

// User Types
export interface UserStats {
  questionsAnswered: number;
  correctAnswers: number;
  accuracy: number;
  streakDays: number;
  totalStudyTimeMinutes: number;
  weakestCategory: QuestionCategory;
  strongestCategory: QuestionCategory;
}

export interface UserProgress {
  currentSessionId: string | null;
  lastQuestionId: string | null;
  questionsAttempted: string[];
  flaggedQuestions: string[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  examDate: string; // ISO date string
  subscriptionStatus: "free" | "season-pass" | "expired";
  stats: UserStats;
  progress: UserProgress;
  createdAt: string;
}

// Quiz Session Types
export type AnswerStatus = "unanswered" | "correct" | "incorrect";

export interface QuizAnswer {
  questionId: string;
  selectedOptionId: string | null;
  status: AnswerStatus;
  timeSpentSeconds: number;
  isFlagged: boolean;
}

export interface QuizSession {
  id: string;
  userId: string;
  mode: "practice" | "mock-exam";
  category?: QuestionCategory;
  questions: Question[];
  answers: QuizAnswer[];
  currentQuestionIndex: number;
  startedAt: string;
  completedAt?: string;
  score?: number;
}

// Tutor Chat Types
export interface TutorMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface TutorSession {
  questionId: string;
  messages: TutorMessage[];
}

// Analytics Types
export interface CategoryPerformance {
  category: QuestionCategory;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  averageTimeSeconds: number;
}

export interface DailyProgress {
  date: string;
  questionsAnswered: number;
  correctAnswers: number;
  studyTimeMinutes: number;
}

// Utility function to get category display name
export function getCategoryDisplayName(category: QuestionCategory): string {
  const names: Record<QuestionCategory, string> = {
    "numerical-reasoning": "Numerical Reasoning",
    "verbal-reasoning": "Verbal Reasoning",
    "analytical-ability": "Analytical Ability",
    "general-information": "General Information",
    "clerical-operations": "Clerical Operations",
  };
  return names[category];
}

// Utility function to get difficulty color
export function getDifficultyColor(difficulty: QuestionDifficulty): string {
  const colors: Record<QuestionDifficulty, string> = {
    easy: "text-emerald-600 bg-emerald-50",
    medium: "text-amber-600 bg-amber-50",
    hard: "text-rose-600 bg-rose-50",
  };
  return colors[difficulty];
}
