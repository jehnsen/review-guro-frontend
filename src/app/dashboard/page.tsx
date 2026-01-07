"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Target,
  TrendingUp,
  Calendar,
  ArrowRight,
  Flame,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Loader2,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { Button, Card, CardTitle } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";
import { practiceApi, questionsApi, profileApi, UserStats, CategoryProgress, categoryDisplayNames, Question } from "@/lib/api";

type ApiCategory = Question["category"];

const categories: ApiCategory[] = [
  "NUMERICAL_ABILITY",
  "VERBAL_ABILITY",
  "ANALYTICAL_ABILITY",
  "GENERAL_INFORMATION",
  "CLERICAL_ABILITY",
];

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [categoryProgress, setCategoryProgress] = useState<CategoryProgress[]>([]);
  const [categoryQuestions, setCategoryQuestions] = useState<Record<ApiCategory, string | null>>({
    NUMERICAL_ABILITY: null,
    VERBAL_ABILITY: null,
    ANALYTICAL_ABILITY: null,
    GENERAL_INFORMATION: null,
    CLERICAL_ABILITY: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [examDate, setExamDate] = useState<Date | null>(null);

  // Calculate days until exam from user's profile exam date
  const daysUntilExam = examDate
    ? Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const greeting = getGreeting();

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }

  useEffect(() => {
    async function fetchStats() {
      if (!isAuthenticated) return;

      try {
        // Fetch stats, progress, profile, and first question for each category in parallel
        const [statsResponse, progressResponse, profileResponse, ...questionResponses] = await Promise.all([
          practiceApi.getStats().catch(() => null),
          practiceApi.getProgressByCategories().catch(() => null),
          profileApi.getProfile().catch(() => null),
          ...categories.map((category) =>
            questionsApi.getQuestions({ category, limit: 1 }).catch(() => ({ data: [] }))
          ),
        ]);

        // Set exam date from profile
        if (profileResponse?.data?.examDate) {
          setExamDate(new Date(profileResponse.data.examDate));
        }

        if (statsResponse?.data) {
          setStats(statsResponse.data);
        }

        if (progressResponse?.data?.categories) {
          setCategoryProgress(progressResponse.data.categories);
        }

        // If we have overall stats from progress response, use those
        if (progressResponse?.data?.overallStats) {
          setStats(prev => prev || {
            totalAttempts: progressResponse.data.overallStats.totalAttempts,
            correctAnswers: progressResponse.data.overallStats.correctAnswers,
            accuracy: progressResponse.data.overallStats.accuracy,
          });
        }

        // Build category questions map
        const questionsMap: Record<ApiCategory, string | null> = {
          NUMERICAL_ABILITY: null,
          VERBAL_ABILITY: null,
          ANALYTICAL_ABILITY: null,
          GENERAL_INFORMATION: null,
          CLERICAL_ABILITY: null,
        };

        categories.forEach((category, index) => {
          const questions = questionResponses[index]?.data;
          if (questions && questions.length > 0) {
            questionsMap[category] = questions[0].id;
          }
        });

        setCategoryQuestions(questionsMap);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (!authLoading) {
      fetchStats();
    }
  }, [isAuthenticated, authLoading]);

  // Get user display name from email
  const displayName = user?.email?.split("@")[0] || "Student";

  if (authLoading || isLoading) {
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
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Banner */}
        <div className="bg-linear-to-r from-blue-600 via-blue-700 to-indigo-500 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute right-20 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />
          <div className="absolute left-1/4 top-1/2 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl" />

          <div className="relative">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              {greeting}, {displayName}!
            </h1>
            <p className="text-blue-100 mb-6">
              {daysUntilExam !== null ? (
                daysUntilExam > 0 ? (
                  <>
                    <span className="font-semibold text-white">
                      {daysUntilExam} days
                    </span>{" "}
                    until your Civil Service Exam. Keep up the momentum!
                  </>
                ) : daysUntilExam === 0 ? (
                  "Your exam is today! You've got this!"
                ) : (
                  "Your exam date has passed. Set a new target in Settings."
                )
              ) : (
                <>Set your exam date in <Link href="/settings" className="underline font-semibold text-white">Settings</Link> to track your countdown.</>
              )}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/practice">
                <Button variant="secondary" icon={ArrowRight} iconPosition="right">
                  Continue Reviewing
                </Button>
              </Link>
              <Link href="/mock-exam">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20 hover:text-white border border-white/30"
                >
                  Take Mock Exam
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <BookOpen size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {stats?.totalAttempts || 0}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Questions Answered
              </p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
              <Target size={24} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {stats?.accuracy?.toFixed(1) || 0}%
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Current Accuracy
              </p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
              <Flame size={24} className="text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {stats?.correctAnswers || 0}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Correct Answers
              </p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
              <TrendingUp size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {user?.isPremium ? "Premium" : "Free"}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Account Status
              </p>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Performance */}
          <div className="lg:col-span-2 space-y-6">
            {/* Getting Started / Weak Areas Alert */}
            <Card className="border-l-4 border-l-blue-500">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <AlertCircle
                    size={20}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                    {stats && stats.totalAttempts > 0
                      ? "Keep Up the Great Work!"
                      : "Ready to Start Learning?"}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {stats && stats.totalAttempts > 0
                      ? `You've answered ${stats.totalAttempts} questions with ${stats.accuracy.toFixed(1)}% accuracy. Keep practicing to improve your score!`
                      : "Start practicing to track your progress and prepare for the Civil Service Exam."}
                  </p>
                  <Link href="/practice">
                    <Button size="sm" variant="outline">
                      Practice Now
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Category Performance */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <CardTitle>Performance by Category</CardTitle>
                <Link href="/analytics">
                  <Button size="sm" variant="ghost" icon={BarChart3}>
                    View Details
                  </Button>
                </Link>
              </div>

              <div className="space-y-5">
                {Object.entries(categoryDisplayNames).map(([key, name]) => {
                  const progress = categoryProgress.find(p => p.category === key);
                  const accuracy = progress?.accuracy ?? 0;
                  const correctAnswers = progress?.correctAnswers ?? 0;
                  const totalAttempts = progress?.attemptedQuestions ?? 0;
                  const hasAttempts = totalAttempts > 0;

                  // Progress bar color based on accuracy
                  const getProgressColor = (acc: number) => {
                    if (acc >= 80) return "bg-emerald-500";
                    if (acc >= 60) return "bg-amber-500";
                    return "bg-amber-500";
                  };

                  return (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {name}
                        </span>
                        <div className="flex items-center gap-3">
                          {hasAttempts && (
                            <>
                              <span className="text-sm text-slate-500 dark:text-slate-400">
                                {correctAnswers}/{totalAttempts}
                              </span>
                              <span className={`text-sm font-semibold ${
                                accuracy >= 80 ? "text-emerald-600 dark:text-emerald-400" :
                                accuracy >= 60 ? "text-amber-600 dark:text-amber-400" :
                                "text-amber-600 dark:text-amber-400"
                              }`}>
                                {Math.round(accuracy)}%
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        {hasAttempts ? (
                          <div
                            className={`h-full ${getProgressColor(accuracy)} rounded-full transition-all duration-300`}
                            style={{ width: `${Math.min(accuracy, 100)}%` }}
                          />
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Progress Summary */}
            <Card>
              <CardTitle className="mb-6">Your Progress</CardTitle>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {stats?.totalAttempts || 0}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Total Questions
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {stats?.correctAnswers || 0}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Correct
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                  <p className="text-3xl font-bold text-rose-600 dark:text-rose-400">
                    {(stats?.totalAttempts || 0) - (stats?.correctAnswers || 0)}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Incorrect
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Info */}
          <div className="space-y-6">
            {/* Exam Countdown */}
            <Card className="bg-linear-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Calendar size={20} className="text-blue-400" />
                <span className="text-sm font-medium text-slate-300">
                  Exam Countdown
                </span>
              </div>
              {examDate && daysUntilExam !== null ? (
                <>
                  <div className="text-center py-4">
                    <p className="text-5xl font-bold mb-2">{Math.max(0, daysUntilExam)}</p>
                    <p className="text-slate-400">
                      {daysUntilExam > 0 ? "days remaining" : daysUntilExam === 0 ? "Exam day!" : "days ago"}
                    </p>
                  </div>
                  <div className="text-center text-sm text-slate-400">
                    {examDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-slate-400 mb-4">No exam date set</p>
                  <Link href="/settings">
                    <Button variant="secondary" size="sm">
                      Set Exam Date
                    </Button>
                  </Link>
                </div>
              )}
            </Card>

            {/* Quick Practice */}
            <Card>
              <CardTitle className="mb-4">Quick Practice</CardTitle>
              <div className="space-y-2">
                {categories.map((category) => {
                  const questionId = categoryQuestions[category];
                  const href = questionId
                    ? `/practice/${questionId}?category=${category}`
                    : `/practice?category=${category}`;

                  return (
                    <Link
                      key={category}
                      href={href}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                    >
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {categoryDisplayNames[category]}
                        </p>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all"
                      />
                    </Link>
                  );
                })}
              </div>
            </Card>

            {/* Today's Goals */}
            <Card>
              <CardTitle className="mb-4">Today&apos;s Goals</CardTitle>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className={`${
                      (stats?.totalAttempts || 0) >= 10
                        ? "text-emerald-500"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Answer 10 questions
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {Math.min(stats?.totalAttempts || 0, 10)}/10 completed
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className={`${
                      (stats?.accuracy || 0) >= 70
                        ? "text-emerald-500"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Achieve 70% accuracy
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Currently at {stats?.accuracy?.toFixed(0) || 0}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className={`${
                      (stats?.correctAnswers || 0) >= 5
                        ? "text-emerald-500"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Get 5 correct answers
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {Math.min(stats?.correctAnswers || 0, 5)}/5 correct
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Account Status */}
            <Card className="bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <TrendingUp size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-100">
                    {user?.isPremium ? "Premium Member" : "Free Account"}
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {user?.isPremium
                      ? "Full access to all features"
                      : "Upgrade for unlimited access"}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
