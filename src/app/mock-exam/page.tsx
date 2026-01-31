"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Clock,
  AlertTriangle,
  Play,
  CheckCircle2,
  XCircle,
  Flag,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Trophy,
  Target,
  BarChart3,
  RotateCcw,
  Home,
  Loader2,
  Crown,
  Lock,
  Sparkles,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { Button, Card, CardTitle, Badge } from "@/components/ui";
import {
  mockExamApi,
  analyticsApi,
  MockExamQuestion,
  MockExamResultData,
  DetailedExamResults,
  categoryDisplayNames,
} from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

type ExamState = "setup" | "in-progress" | "review" | "completed";

interface ExamConfig {
  totalQuestions: number;
  timeLimitMinutes: number;
  passingScore: number;
}

const DEFAULT_CONFIG: ExamConfig = {
  totalQuestions: 170,
  timeLimitMinutes: 170,
  passingScore: 80,
};

// Free tier limits
const FREE_TIER_MAX_QUESTIONS = 20;
const FREE_TIER_MAX_EXAMS_PER_MONTH = 3;

// Preset options for exam configuration
// Real CSE Professional: 170 questions, 170 minutes (3 hours 10 minutes)
// Real CSE Sub-Professional: 165 questions, 165 minutes
const QUESTION_OPTIONS_PREMIUM = [20, 50, 100, 170];
const QUESTION_OPTIONS_FREE = [10, 15, 20];
const TIME_OPTIONS = [
  { questions: 10, time: 10 },
  { questions: 15, time: 15 },
  { questions: 20, time: 20 },
  { questions: 50, time: 50 },
  { questions: 100, time: 100 },
  { questions: 170, time: 170 },
];

export default function MockExamPage() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const isPremium = user?.isPremium ?? false;

  // Exam state
  const [examState, setExamState] = useState<ExamState>("setup");
  const [examId, setExamId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<MockExamQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(DEFAULT_CONFIG.timeLimitMinutes * 60);
  const [showNavigator, setShowNavigator] = useState(false);
  const [config, setConfig] = useState<ExamConfig>(
    isPremium
      ? DEFAULT_CONFIG
      : { totalQuestions: 20, timeLimitMinutes: 20, passingScore: 80 }
  );

  // Results state
  const [examResults, setExamResults] = useState<MockExamResultData | null>(null);
  const [detailedResults, setDetailedResults] = useState<DetailedExamResults | null>(null);

  // Loading states
  const [isStarting, setIsStarting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [isCheckingActiveExam, setIsCheckingActiveExam] = useState(true);

  // Free tier limits state
  const [examsUsedThisMonth, setExamsUsedThisMonth] = useState(0);
  const [isLoadingLimits, setIsLoadingLimits] = useState(!isPremium);

  // Explanation view tracking for free users (taste test: first 3 per day are free)
  const [explanationsViewedToday, setExplanationsViewedToday] = useState(0);
  const [remainingExplanations, setRemainingExplanations] = useState(3);
  const [unlockedExplanations, setUnlockedExplanations] = useState<Set<string>>(new Set());
  const FREE_EXPLANATIONS_PER_DAY = 3;

  // Fetch explanation limits from backend on mount
  useEffect(() => {
    async function fetchExplanationLimits() {
      if (!isAuthenticated || authLoading || isPremium) return;

      try {
        const response = await analyticsApi.getExplanationLimits();
        if (response.data) {
          setExplanationsViewedToday(response.data.viewedToday);
          setRemainingExplanations(response.data.remainingToday);
        }
      } catch (error) {
        console.error("Error fetching explanation limits:", error);
      }
    }

    fetchExplanationLimits();
  }, [isAuthenticated, authLoading, isPremium]);

  // Ref to track if answer is being saved
  const savingAnswerRef = useRef(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Fetch mock exam limits for free users
  useEffect(() => {
    async function fetchLimits() {
      if (!isAuthenticated || authLoading || isPremium) return;

      setIsLoadingLimits(true);
      try {
        const response = await mockExamApi.getLimits();
        if (response.data) {
          setExamsUsedThisMonth(response.data.examsUsedThisMonth);
        }
      } catch (error) {
        console.error("Error fetching mock exam limits:", error);
      } finally {
        setIsLoadingLimits(false);
      }
    }

    fetchLimits();
  }, [isAuthenticated, authLoading, isPremium]);

  // Check for in-progress exam on page load
  useEffect(() => {
    async function checkForActiveExam() {
      if (!isAuthenticated || authLoading) return;

      setIsCheckingActiveExam(true);
      try {
        // Check if there's an in-progress exam
        const historyResponse = await mockExamApi.getHistory({ status: "IN_PROGRESS", limit: 1 });

        if (historyResponse.data?.exams && historyResponse.data.exams.length > 0) {
          const activeExam = historyResponse.data.exams[0];

          // Fetch full exam data including questions and answers
          const examResponse = await mockExamApi.getExam(activeExam.examId);

          if (examResponse.data) {
            const examData = examResponse.data;

            // Restore exam state
            setExamId(examData.examId);
            setQuestions(examData.questions);
            setAnswers(examData.answers || {});
            setFlaggedQuestions(examData.flaggedQuestions || []);
            setTimeRemaining(examData.timeRemainingSeconds);
            setConfig({
              totalQuestions: examData.totalQuestions,
              timeLimitMinutes: examData.timeLimitMinutes,
              passingScore: examData.passingScore,
            });
            setExamState("in-progress");
          }
        }
      } catch (error) {
        console.error("Error checking for active exam:", error);
      } finally {
        setIsCheckingActiveExam(false);
      }
    }

    checkForActiveExam();
  }, [isAuthenticated, authLoading]);

  // Start exam - create new mock exam via API
  const startExam = async () => {
    if (!isAuthenticated) return;

    setIsStarting(true);
    try {
      const response = await mockExamApi.createExam({
        totalQuestions: config.totalQuestions,
        timeLimitMinutes: config.timeLimitMinutes,
        passingScore: config.passingScore,
        categories: "MIXED",
      });

      if (response.data) {
        setExamId(response.data.examId);
        setQuestions(response.data.questions);
        setAnswers({});
        setFlaggedQuestions([]);
        setTimeRemaining(response.data.timeLimitMinutes * 60);
        setCurrentQuestionIndex(0);
        setExamState("in-progress");
      }
    } catch (error) {
      console.error("Error starting exam:", error);
      alert("Failed to start exam. Please try again.");
    } finally {
      setIsStarting(false);
    }
  };

  // Timer effect
  useEffect(() => {
    if (examState !== "in-progress") return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Auto-submit when time expires
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examState]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Get time styling based on remaining time
  const getTimeStyles = () => {
    const percentage = (timeRemaining / (config.timeLimitMinutes * 60)) * 100;
    // Red at last 10% - creates maximum urgency with pulse animation
    if (percentage <= 10) {
      return {
        container: "bg-rose-100 dark:bg-rose-900/50 border-2 border-rose-500 animate-pulse",
        text: "text-rose-700 dark:text-rose-300",
        icon: "text-rose-600 dark:text-rose-400"
      };
    }
    // Orange at 50% or less - builds pressure
    if (percentage <= 50) {
      return {
        container: "bg-orange-100 dark:bg-orange-900/50 border-2 border-orange-500",
        text: "text-orange-700 dark:text-orange-300",
        icon: "text-orange-600 dark:text-orange-400"
      };
    }
    // Blue above 50% - calm state
    return {
      container: "bg-blue-100 dark:bg-blue-900/50 border-2 border-blue-500",
      text: "text-blue-700 dark:text-blue-300",
      icon: "text-blue-600 dark:text-blue-400"
    };
  };

  const timeStyles = getTimeStyles();

  // Handle answer selection - auto-save to API
  const selectAnswer = async (optionId: string) => {
    if (!examId || !currentQuestion || savingAnswerRef.current) return;

    // Update local state immediately
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));

    // Save to API (debounced)
    savingAnswerRef.current = true;
    try {
      await mockExamApi.saveAnswer(examId, currentQuestion.id, optionId);
    } catch (error) {
      console.error("Error saving answer:", error);
    } finally {
      savingAnswerRef.current = false;
    }
  };

  // Toggle flag
  const toggleFlag = async () => {
    if (!examId || !currentQuestion) return;

    const isCurrentlyFlagged = flaggedQuestions.includes(currentQuestion.id);
    const newFlagged = isCurrentlyFlagged
      ? flaggedQuestions.filter((id) => id !== currentQuestion.id)
      : [...flaggedQuestions, currentQuestion.id];

    // Update local state immediately
    setFlaggedQuestions(newFlagged);

    // Save to API
    try {
      await mockExamApi.flagQuestion(examId, currentQuestion.id, !isCurrentlyFlagged);
    } catch (error) {
      console.error("Error flagging question:", error);
      // Revert on error
      setFlaggedQuestions(flaggedQuestions);
    }
  };

  // Navigation
  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setShowNavigator(false);
  };

  const goNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Submit exam
  const handleSubmitExam = async () => {
    if (!examId || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await mockExamApi.submitExam(examId);
      if (response.data) {
        setExamResults(response.data);
        setExamState("completed");
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
      alert("Failed to submit exam. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load detailed results for review
  const loadDetailedResults = async () => {
    if (!examId) return;

    setIsLoadingResults(true);
    try {
      const response = await mockExamApi.getResults(examId);
      if (response.data) {
        setDetailedResults(response.data);
        setExamState("review");
      }
    } catch (error) {
      console.error("Error loading results:", error);
      alert("Failed to load results. Please try again.");
    } finally {
      setIsLoadingResults(false);
    }
  };

  // Reset for new exam
  const resetExam = () => {
    setExamId(null);
    setQuestions([]);
    setAnswers({});
    setFlaggedQuestions([]);
    setExamResults(null);
    setDetailedResults(null);
    setCurrentQuestionIndex(0);
    setTimeRemaining(config.timeLimitMinutes * 60);
    setExamState("setup");
  };

  // Get current answer
  const getCurrentAnswer = () => {
    return currentQuestion ? answers[currentQuestion.id] : null;
  };

  // Unlock explanation for a specific question
  const unlockExplanation = async (questionId: string) => {
    if (isPremium) return; // Premium users have all explanations unlocked

    if (explanationsViewedToday < FREE_EXPLANATIONS_PER_DAY) {
      try {
        // Call backend API to record the view
        const response = await analyticsApi.recordExplanationView();

        if (response.data) {
          // Update local state with backend response
          setExplanationsViewedToday(response.data.viewedToday);
          setRemainingExplanations(response.data.remainingToday);
          setUnlockedExplanations((prev) => new Set([...prev, questionId]));
        }
      } catch (error) {
        console.error("Error unlocking explanation:", error);
        // Fallback to optimistic update if API fails
        setUnlockedExplanations((prev) => new Set([...prev, questionId]));
        setExplanationsViewedToday((prev) => prev + 1);
        setRemainingExplanations((prev) => Math.max(0, prev - 1));
      }
    }
  };

  // Check if explanation is unlocked for a question
  const isExplanationUnlocked = (questionId: string) => {
    return isPremium || unlockedExplanations.has(questionId);
  };

  // Calculate remaining exams for free users
  const remainingExams = FREE_TIER_MAX_EXAMS_PER_MONTH - examsUsedThisMonth;
  const hasReachedMonthlyLimit = !isPremium && examsUsedThisMonth >= FREE_TIER_MAX_EXAMS_PER_MONTH;

  // Get question options based on user tier
  const questionOptions = isPremium ? QUESTION_OPTIONS_PREMIUM : QUESTION_OPTIONS_FREE;

  // Loading state
  if (authLoading || isCheckingActiveExam || isLoadingLimits) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-3 text-slate-600 dark:text-slate-400">
            {isCheckingActiveExam ? "Checking for active exam..." : "Loading..."}
          </span>
        </div>
      </DashboardLayout>
    );
  }

  // Setup Screen
  if (examState === "setup") {
    // Check if free user has reached monthly limit
    if (hasReachedMonthlyLimit) {
      return (
        <DashboardLayout>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                <Clock size={36} className="text-amber-600 dark:text-amber-400" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <Lock size={14} className="text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Monthly Limit Reached
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                You&apos;ve used all {FREE_TIER_MAX_EXAMS_PER_MONTH} free mock exams this month
              </p>
            </div>

            {/* Upgrade Prompt Card */}
            <Card className="mb-6 border-2 border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Crown size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Upgrade to Continue
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
                  Upgrade to Season Pass for unlimited mock exams with up to 170 questions.
                </p>

                {/* Premium Features */}
                <div className="grid grid-cols-2 gap-3 mb-6 text-left max-w-md mx-auto">
                  {[
                    "Unlimited mock exams",
                    "Up to 170 questions",
                    "Real exam timing",
                    "All 5 categories",
                    "Detailed results review",
                    "Performance analytics",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <Sparkles size={14} className="text-amber-500 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/pricing">
                  <Button
                    size="lg"
                    icon={Crown}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                  >
                    Upgrade to Season Pass
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Info Card */}
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex gap-3">
                <Clock className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={20} />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    Your limit will reset next month
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Free users can take up to {FREE_TIER_MAX_EXAMS_PER_MONTH} mock exams per month with up to {FREE_TIER_MAX_QUESTIONS} questions each.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </DashboardLayout>
      );
    }

    // Setup screen for both free and premium users
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Mock Examination
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Simulate real exam conditions with timed practice
            </p>
          </div>

          {/* Free tier usage banner */}
          {!isPremium && (
            <Card className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <Target className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      Free Tier: {remainingExams} of {FREE_TIER_MAX_EXAMS_PER_MONTH} exams remaining this month
                    </h3>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Up to {FREE_TIER_MAX_QUESTIONS} questions per exam. Upgrade for unlimited exams with up to 170 questions.
                    </p>
                  </div>
                </div>
                <Link href="/pricing">
                  <Button
                    size="sm"
                    variant="outline"
                    icon={Crown}
                    className="shrink-0"
                  >
                    Upgrade
                  </Button>
                </Link>
              </div>
            </Card>
          )}

          <Card className="mb-6">
            <CardTitle className="mb-4">Exam Configuration</CardTitle>
            <div className="space-y-6">
              {/* Question Count Selector */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Number of Questions {!isPremium && `(Max ${FREE_TIER_MAX_QUESTIONS} for free users)`}
                </label>
                <div className={`grid gap-2 ${isPremium ? 'grid-cols-4' : 'grid-cols-3'}`}>
                  {questionOptions.map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        const timeOption = TIME_OPTIONS.find((t) => t.questions === num);
                        setConfig({
                          ...config,
                          totalQuestions: num,
                          timeLimitMinutes: timeOption?.time || num * 1.2,
                        });
                      }}
                      className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                        config.totalQuestions === num
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Time Limit</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {config.timeLimitMinutes} {config.timeLimitMinutes === 1 ? 'minute' : 'minutes'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Passing Score</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {config.passingScore}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Categories</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    Mixed (All Categories)
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="mb-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <div className="flex gap-3">
              <AlertTriangle className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                  Important Instructions
                </h3>
                <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                  <li>• Once started, the timer cannot be paused</li>
                  <li>• You can flag questions to review later</li>
                  <li>• Use the navigator to jump between questions</li>
                  <li>• Unanswered questions count as incorrect</li>
                  <li>• Answers are auto-saved as you select them</li>
                </ul>
              </div>
            </div>
          </Card>

          <Button
            size="lg"
            fullWidth
            icon={Play}
            onClick={startExam}
            isLoading={isStarting}
            disabled={!isAuthenticated}
          >
            Start Mock Exam
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Completed Screen
  if (examState === "completed" && examResults) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                examResults.passed
                  ? "bg-emerald-100 dark:bg-emerald-900/30"
                  : "bg-rose-100 dark:bg-rose-900/30"
              }`}
            >
              {examResults.passed ? (
                <Trophy size={40} className="text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Target size={40} className="text-rose-600 dark:text-rose-400" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {examResults.passed ? "Congratulations!" : "Keep Practicing!"}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {examResults.passed
                ? "You passed the mock examination!"
                : "You didn't reach the passing score this time."}
            </p>
          </div>

          {/* Score Card */}
          <Card className="mb-6">
            <div className="text-center py-6">
              <div
                className={`text-6xl font-bold mb-2 ${
                  examResults.passed
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {examResults.score}%
              </div>
              <p className="text-slate-500 dark:text-slate-400">Your Score</p>
              <Badge
                variant={examResults.passed ? "success" : "danger"}
                className="mt-3"
              >
                {examResults.passed ? "PASSED" : "FAILED"} ({examResults.passingScore}% required)
              </Badge>
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="text-center" padding="sm">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {examResults.correctAnswers}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Correct</p>
            </Card>
            <Card className="text-center" padding="sm">
              <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                {examResults.incorrectAnswers}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Incorrect</p>
            </Card>
            <Card className="text-center" padding="sm">
              <div className="text-2xl font-bold text-slate-400">
                {examResults.unansweredQuestions}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Unanswered</p>
            </Card>
          </div>

          {/* Time Spent */}
          <Card className="mb-6 text-center" padding="sm">
            <p className="text-sm text-slate-500 dark:text-slate-400">Time Spent</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {examResults.timeSpentMinutes} {examResults.timeSpentMinutes === 1 ? 'minute' : 'minutes'}
            </p>
          </Card>

          {/* "Moment of Pain" Upsell Banner - Show when user fails and is not premium */}
          {!examResults.passed && !isPremium && (
            <Card className="mb-6 border-2 border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <BarChart3 size={28} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Want to know exactly where you went wrong?
                  </h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                    Unlock detailed analytics to see your performance by category, identify weak areas, and get personalized study recommendations. Plus unlimited explanations to learn from every mistake.
                  </p>
                  <div className="flex items-center gap-3">
                    <Link href="/pricing">
                      <Button
                        size="sm"
                        icon={Crown}
                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                      >
                        Upgrade for ₱299/month
                      </Button>
                    </Link>
                    <Link href="/pricing" className="text-sm text-amber-700 dark:text-amber-300 hover:underline">
                      See all features
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Button
              fullWidth
              variant="outline"
              icon={BarChart3}
              onClick={loadDetailedResults}
              isLoading={isLoadingResults}
            >
              Review Answers
            </Button>
            <Button fullWidth icon={RotateCcw} onClick={resetExam}>
              Take Another Exam
            </Button>
            <Link href="/dashboard">
              <Button fullWidth variant="ghost" icon={Home}>
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Review Screen
  if (examState === "review" && detailedResults) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Review Answers
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                See which questions you got right and wrong
              </p>
            </div>
            <Button variant="outline" onClick={() => setExamState("completed")}>
              Back to Results
            </Button>
          </div>

          <div className="space-y-4">
            {detailedResults.questions.map((question, index) => {
              const wasAnswered = !!question.selectedOptionId;

              return (
                <Card key={question.questionId} padding="lg">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        !wasAnswered
                          ? "bg-slate-100 dark:bg-slate-800"
                          : question.isCorrect
                            ? "bg-emerald-100 dark:bg-emerald-900/30"
                            : "bg-rose-100 dark:bg-rose-900/30"
                      }`}
                    >
                      {!wasAnswered ? (
                        <span className="text-sm font-medium text-slate-500">
                          {index + 1}
                        </span>
                      ) : question.isCorrect ? (
                        <CheckCircle2
                          size={18}
                          className="text-emerald-600 dark:text-emerald-400"
                        />
                      ) : (
                        <XCircle size={18} className="text-rose-600 dark:text-rose-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-900 dark:text-white mb-3">
                        {question.questionText}
                      </p>

                      <div className="space-y-2">
                        {question.options.map((option) => {
                          const isSelected = question.selectedOptionId === option.id;
                          const isCorrectOption = option.id === question.correctOptionId;

                          return (
                            <div
                              key={option.id}
                              className={`flex items-center gap-3 p-3 rounded-lg text-sm ${
                                isCorrectOption
                                  ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
                                  : isSelected && !isCorrectOption
                                    ? "bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800"
                                    : "bg-slate-50 dark:bg-slate-800/50"
                              }`}
                            >
                              <span
                                className={`w-6 h-6 rounded flex items-center justify-center text-xs font-medium ${
                                  isCorrectOption
                                    ? "bg-emerald-500 text-white"
                                    : isSelected
                                      ? "bg-rose-500 text-white"
                                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                                }`}
                              >
                                {option.id.toUpperCase()}
                              </span>
                              <span
                                className={
                                  isCorrectOption
                                    ? "text-emerald-900 dark:text-emerald-100"
                                    : isSelected
                                      ? "text-rose-900 dark:text-rose-100"
                                      : "text-slate-600 dark:text-slate-400"
                                }
                              >
                                {option.text}
                              </span>
                              {isCorrectOption && (
                                <CheckCircle2
                                  size={16}
                                  className="text-emerald-600 dark:text-emerald-400 ml-auto"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {question.explanation && (
                        <div className="mt-4 relative">
                          {!isExplanationUnlocked(question.questionId) && (
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white dark:via-slate-900/80 dark:to-slate-900 rounded-lg flex items-center justify-center z-10 backdrop-blur-sm">
                              <div className="text-center">
                                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                                  <Lock size={20} className="text-amber-600 dark:text-amber-400" />
                                </div>
                                {explanationsViewedToday < FREE_EXPLANATIONS_PER_DAY ? (
                                  <>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                                      {FREE_EXPLANATIONS_PER_DAY - explanationsViewedToday} free explanations remaining today
                                    </p>
                                    <Button
                                      size="sm"
                                      onClick={() => unlockExplanation(question.questionId)}
                                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                                    >
                                      Unlock Explanation
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                                      Explanation Locked
                                    </p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 max-w-xs">
                                      You&apos;ve used all {FREE_EXPLANATIONS_PER_DAY} free explanations today. Upgrade for unlimited access.
                                    </p>
                                    <Link href="/pricing">
                                      <Button
                                        size="sm"
                                        icon={Crown}
                                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                                      >
                                        Upgrade Now
                                      </Button>
                                    </Link>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                          <div className={`p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg ${!isExplanationUnlocked(question.questionId) ? 'blur-sm select-none' : ''}`}>
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                              <span className="font-medium">Explanation: </span>
                              {question.explanation}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // In-Progress Screen
  if (!currentQuestion) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  const currentAnswer = getCurrentAnswer();
  const isFlagged = flaggedQuestions.includes(currentQuestion.id);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Badge variant="primary">Mock Exam</Badge>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer - Prominent display */}
            <div
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl shadow-md ${timeStyles.container}`}
            >
              <Clock size={20} className={timeStyles.icon} />
              <span className={`font-mono font-bold text-xl tracking-wide ${timeStyles.text}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>

            {/* Navigator Toggle */}
            <Button
              variant="outline"
              size="sm"
              icon={LayoutGrid}
              onClick={() => setShowNavigator(!showNavigator)}
            >
              Navigator
            </Button>
          </div>
        </div>

        {/* Question Navigator Modal */}
        {showNavigator && (
          <Card className="mb-6 animate-fade-in">
            <CardTitle className="mb-4">Question Navigator</CardTitle>
            <div className="grid grid-cols-10 gap-2">
              {questions.map((q, index) => {
                const isAnswered = !!answers[q.id];
                const isQuestionFlagged = flaggedQuestions.includes(q.id);
                const isCurrent = index === currentQuestionIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(index)}
                    className={`
                      w-10 h-10 rounded-lg text-sm font-medium transition-all relative
                      ${
                        isCurrent
                          ? "bg-blue-600 text-white ring-2 ring-blue-300"
                          : isAnswered
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }
                    `}
                  >
                    {index + 1}
                    {isQuestionFlagged && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-emerald-100 dark:bg-emerald-900/30" />
                <span className="text-slate-600 dark:text-slate-400">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-slate-100 dark:bg-slate-800" />
                <span className="text-slate-600 dark:text-slate-400">Unanswered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-amber-500" />
                <span className="text-slate-600 dark:text-slate-400">Flagged</span>
              </div>
            </div>
          </Card>
        )}

        {/* Question Card */}
        <Card padding="lg" className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="default">
              {categoryDisplayNames[currentQuestion.category]}
            </Badge>
            <Button
              variant={isFlagged ? "danger" : "ghost"}
              size="sm"
              icon={Flag}
              onClick={toggleFlag}
            >
              {isFlagged ? "Flagged" : "Flag"}
            </Button>
          </div>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 leading-relaxed whitespace-pre-line">
            {currentQuestion.questionText}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = currentAnswer === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => selectAnswer(option.id)}
                  className={`
                    w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all
                    ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }
                  `}
                >
                  <span
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm shrink-0
                      ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }
                    `}
                  >
                    {option.id.toUpperCase()}
                  </span>
                  <span
                    className={`text-base ${
                      isSelected
                        ? "text-blue-900 dark:text-blue-100"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            icon={ChevronLeft}
            onClick={goPrev}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>

          <div className="flex items-center gap-3">
            {currentQuestionIndex === questions.length - 1 ? (
              <Button
                variant="primary"
                onClick={handleSubmitExam}
                isLoading={isSubmitting}
              >
                Submit Exam
              </Button>
            ) : (
              <Button
                icon={ChevronRight}
                iconPosition="right"
                onClick={goNext}
              >
                Next
              </Button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
            <span>Progress</span>
            <span>
              {Object.keys(answers).length} of {questions.length} answered
            </span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{
                width: `${(Object.keys(answers).length / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
