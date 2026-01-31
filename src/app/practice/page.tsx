"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  FileText,
  Brain,
  Globe,
  ClipboardList,
  Play,
  Loader2,
  Crown,
  Lock,
  Target,
  AlertCircle,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { Button, Card, CardTitle, Badge } from "@/components/ui";
import {
  questionsApi,
  practiceApi,
  Question,
  CategoryProgress,
  ProgressResponse,
  PracticeLimitsResponse,
  categoryDisplayNames,
} from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

type ApiCategory = Question["category"];

const categoryIcons: Record<ApiCategory, typeof Calculator> = {
  NUMERICAL_ABILITY: Calculator,
  VERBAL_ABILITY: FileText,
  ANALYTICAL_ABILITY: Brain,
  GENERAL_INFORMATION: Globe,
  CLERICAL_ABILITY: ClipboardList,
};

const categoryColors: Record<ApiCategory, string> = {
  NUMERICAL_ABILITY: "blue",
  VERBAL_ABILITY: "purple",
  ANALYTICAL_ABILITY: "amber",
  GENERAL_INFORMATION: "emerald",
  CLERICAL_ABILITY: "rose",
};

const categories: ApiCategory[] = [
  "NUMERICAL_ABILITY",
  "VERBAL_ABILITY",
  "ANALYTICAL_ABILITY",
  "GENERAL_INFORMATION",
  "CLERICAL_ABILITY",
];

interface CategoryData {
  category: ApiCategory;
  questions: Question[];
  count: number;
  progress?: CategoryProgress;
}

const FREE_QUESTION_LIMIT = 15;

export default function PracticeLandingPage() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const isPremium = user?.isPremium ?? false;
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [overallStats, setOverallStats] = useState<ProgressResponse["overallStats"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Daily limits state
  const [dailyLimits, setDailyLimits] = useState<PracticeLimitsResponse | null>(null);
  const [isLoadingLimits, setIsLoadingLimits] = useState(!isPremium);

  // Fetch daily limits for free users
  useEffect(() => {
    async function fetchLimits() {
      if (!isAuthenticated || authLoading || isPremium) return;

      setIsLoadingLimits(true);
      try {
        const response = await practiceApi.getLimits();
        if (response.data) {
          setDailyLimits(response.data);
        }
      } catch (error) {
        console.error("Error fetching practice limits:", error);
      } finally {
        setIsLoadingLimits(false);
      }
    }

    fetchLimits();
  }, [isAuthenticated, authLoading, isPremium]);

  useEffect(() => {
    async function fetchData() {
      if (!isAuthenticated) return;

      setIsLoading(true);
      setError(null);

      try {
        // Fetch progress data and questions in parallel
        const [progressResponse, ...questionResponses] = await Promise.all([
          practiceApi.getProgressByCategories().catch(() => null),
          ...categories.map((category) =>
            questionsApi.getQuestions({ category, limit: 10 }).catch(() => ({ data: [] }))
          ),
        ]);

        // Build category data with progress
        const results: CategoryData[] = categories.map((category, index) => {
          const questionsData = questionResponses[index];
          const progress = progressResponse?.data?.categories?.find(
            (c) => c.category === category
          );

          return {
            category,
            questions: questionsData?.data || [],
            count: progress?.questionsAvailable || questionsData?.data?.length || 0,
            progress,
          };
        });

        setCategoryData(results);

        // Set overall stats from progress response
        if (progressResponse?.data?.overallStats) {
          setOverallStats(progressResponse.data.overallStats);
        }
      } catch (err) {
        setError("Failed to load practice data. Please try again.");
        console.error("Error fetching practice data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (!authLoading) {
      fetchData();
    }
  }, [isAuthenticated, authLoading]);

  // Get first question from any category for quick start
  const firstQuestion = categoryData.find((c) => c.questions.length > 0)
    ?.questions[0];

  if (authLoading || isLoading || isLoadingLimits) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Practice Mode
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Choose a category to start practicing or continue with mixed
            questions.
          </p>
        </div>

        {error && (
          <Card className="mb-8 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20">
            <p className="text-rose-600 dark:text-rose-400">{error}</p>
          </Card>
        )}

        {/* User Stats Banner */}
        {overallStats && overallStats.totalAttempts > 0 && (
          <Card className="mb-8 bg-slate-50 dark:bg-slate-800/50">
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Attempts
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {overallStats.totalAttempts}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Correct Answers
                </p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {overallStats.correctAnswers}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Accuracy
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {overallStats.accuracy.toFixed(1)}%
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Quick Start */}
        <Card className="mb-8 bg-linear-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                <Play size={28} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Quick Start</h2>
                <p className="text-blue-100">
                  Jump into mixed questions from all categories
                </p>
              </div>
            </div>
            <Link
              href={
                firstQuestion ? `/practice/${firstQuestion.id}` : "/practice"
              }
            >
              <Button
                variant="secondary"
                icon={ArrowRight}
                iconPosition="right"
                disabled={!firstQuestion}
              >
                Start Practice
              </Button>
            </Link>
          </div>
        </Card>

        {/* Free User Daily Limits Banner */}
        {!isPremium && dailyLimits && (
          <>
            {/* Daily Usage Banner */}
            <Card className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <Target className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      Daily Practice: {dailyLimits.usedToday} of {dailyLimits.dailyLimit} questions used today
                    </h3>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {dailyLimits.remainingToday > 0 ? (
                        <>{dailyLimits.remainingToday} questions remaining today. Upgrade for unlimited practice!</>
                      ) : (
                        <>Daily limit reached. Your limit resets tomorrow. Upgrade for unlimited practice!</>
                      )}
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

            {/* Limit Reached Warning */}
            {dailyLimits.remainingToday === 0 && (
              <Card className="mb-6 border-2 border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                      <AlertCircle size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                        Daily Limit Reached
                        <Crown size={16} className="text-amber-500" />
                      </h3>
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        You&apos;ve practiced {dailyLimits.dailyLimit} questions today. Upgrade for unlimited daily practice!
                      </p>
                    </div>
                  </div>
                  <Link href="/pricing">
                    <Button
                      variant="primary"
                      icon={Crown}
                      className="bg-amber-500 hover:bg-amber-600 border-amber-500 hover:border-amber-600"
                    >
                      Upgrade Now
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
          </>
        )}

        {/* Categories Grid */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Practice by Category
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {categories.map((category) => {
              const Icon = categoryIcons[category];
              const color = categoryColors[category];
              const data = categoryData.find((c) => c.category === category);
              const questionCount = data?.progress?.questionsAvailable || data?.count || 0;
              const firstCategoryQuestion = data?.questions[0];
              const progress = data?.progress;
              const accuracy = progress?.accuracy ?? 0;
              const hasAttempts = progress && progress.attemptedQuestions > 0;

              // Progress bar color based on accuracy
              const getProgressColor = (acc: number) => {
                if (acc >= 80) return "bg-emerald-500";
                if (acc >= 60) return "bg-amber-500";
                return "bg-rose-500";
              };

              return (
                <Card key={category} hover className="group">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                        ${color === "blue" ? "bg-blue-50 dark:bg-blue-900/30" : ""}
                        ${color === "purple" ? "bg-purple-50 dark:bg-purple-900/30" : ""}
                        ${color === "amber" ? "bg-amber-50 dark:bg-amber-900/30" : ""}
                        ${color === "emerald" ? "bg-emerald-50 dark:bg-emerald-900/30" : ""}
                        ${color === "rose" ? "bg-rose-50 dark:bg-rose-900/30" : ""}
                      `}
                    >
                      <Icon
                        size={24}
                        className={`
                          ${color === "blue" ? "text-blue-600 dark:text-blue-400" : ""}
                          ${color === "purple" ? "text-purple-600 dark:text-purple-400" : ""}
                          ${color === "amber" ? "text-amber-600 dark:text-amber-400" : ""}
                          ${color === "emerald" ? "text-emerald-600 dark:text-emerald-400" : ""}
                          ${color === "rose" ? "text-rose-600 dark:text-rose-400" : ""}
                        `}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {categoryDisplayNames[category]}
                        </h3>
                        {hasAttempts && (
                          <span className={`text-sm font-semibold ${
                            accuracy >= 80 ? "text-emerald-600 dark:text-emerald-400" :
                            accuracy >= 60 ? "text-amber-600 dark:text-amber-400" :
                            "text-rose-600 dark:text-rose-400"
                          }`}>
                            {Math.round(accuracy)}%
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                        {questionCount > 0 ? (
                          isPremium ? (
                            `${questionCount} questions available`
                          ) : (
                            <span className="flex items-center gap-1">
                              {Math.min(questionCount, FREE_QUESTION_LIMIT)} of {questionCount} questions
                              <span className="text-amber-600 dark:text-amber-400">(free limit)</span>
                            </span>
                          )
                        ) : (
                          "No questions available"
                        )}
                      </p>

                      {/* Progress bar */}
                      {hasAttempts && (
                        <div className="mb-3">
                          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getProgressColor(accuracy)} transition-all duration-300`}
                              style={{ width: `${Math.min(accuracy, 100)}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {!hasAttempts && questionCount > 0 && (
                        <div className="mb-3">
                          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />
                        </div>
                      )}

                      <Link
                        href={
                          firstCategoryQuestion
                            ? `/practice/${firstCategoryQuestion.id}?category=${category}`
                            : "/practice"
                        }
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          icon={ArrowRight}
                          iconPosition="right"
                          className="group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30"
                          disabled={!firstCategoryQuestion}
                        >
                          Practice Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <Card className="bg-slate-50 dark:bg-slate-800/50">
          <CardTitle className="mb-4">Study Tips</CardTitle>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                1
              </span>
              <span>
                Start with your weakest category to maximize improvement
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                2
              </span>
              <span>
                Read explanations carefully, even for questions you got right
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                3
              </span>
              <span>
                Use the AI Tutor to ask follow-up questions when confused
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                4
              </span>
              <span>Take mock exams regularly to track your progress</span>
            </li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}
