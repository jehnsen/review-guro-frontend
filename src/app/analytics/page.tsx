"use client";

import {
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Calendar,
  Award,
  BookOpen,
  Brain,
  Zap,
  ChevronRight,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { Card, CardTitle, Badge } from "@/components/ui";
import {
  mockUser,
  mockCategoryPerformance,
  mockDailyProgress,
  formatStudyTime,
} from "@/lib/mock-data";
import { getCategoryDisplayName } from "@/lib/types";

export default function AnalyticsPage() {
  // Calculate weekly stats
  const weeklyQuestions = mockDailyProgress.reduce(
    (sum, day) => sum + day.questionsAnswered,
    0
  );
  const weeklyCorrect = mockDailyProgress.reduce(
    (sum, day) => sum + day.correctAnswers,
    0
  );
  const weeklyAccuracy = Math.round((weeklyCorrect / weeklyQuestions) * 100);
  const weeklyStudyTime = mockDailyProgress.reduce(
    (sum, day) => sum + day.studyTimeMinutes,
    0
  );

  // Find best and worst categories
  const sortedCategories = [...mockCategoryPerformance].sort(
    (a, b) => b.accuracy - a.accuracy
  );
  const bestCategory = sortedCategories[0];
  const worstCategory = sortedCategories[sortedCategories.length - 1];

  // Calculate max for chart scaling
  const maxQuestions = Math.max(...mockDailyProgress.map((d) => d.questionsAnswered));

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Analytics
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Track your progress and identify areas for improvement
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <BookOpen size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <Badge variant="success" size="sm">
                <TrendingUp size={12} className="mr-1" />
                +12%
              </Badge>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {mockUser.stats.questionsAnswered}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Questions
            </p>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                <Target size={20} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <Badge
                variant={mockUser.stats.accuracy >= 80 ? "success" : "warning"}
                size="sm"
              >
                {mockUser.stats.accuracy >= 80 ? (
                  <TrendingUp size={12} className="mr-1" />
                ) : (
                  <TrendingDown size={12} className="mr-1" />
                )}
                {mockUser.stats.accuracy >= 80 ? "+5%" : "-2%"}
              </Badge>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {mockUser.stats.accuracy.toFixed(1)}%
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Overall Accuracy
            </p>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                <Clock size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              <Badge variant="info" size="sm">
                This Week
              </Badge>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {formatStudyTime(mockUser.stats.totalStudyTimeMinutes)}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Study Time
            </p>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
                <Zap size={20} className="text-amber-600 dark:text-amber-400" />
              </div>
              <Badge variant="warning" size="sm">
                Active
              </Badge>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {mockUser.stats.streakDays} days
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Current Streak
            </p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Activity Chart */}
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <CardTitle>Weekly Activity</CardTitle>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-slate-600 dark:text-slate-400">Questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-slate-600 dark:text-slate-400">Correct</span>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="flex items-end gap-4 h-48">
              {mockDailyProgress.map((day, index) => {
                const date = new Date(day.date);
                const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
                const questionHeight = (day.questionsAnswered / maxQuestions) * 100;
                const correctHeight = (day.correctAnswers / maxQuestions) * 100;

                return (
                  <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end justify-center gap-1 h-40">
                      <div
                        className="w-5 bg-blue-500 rounded-t transition-all duration-300"
                        style={{ height: `${questionHeight}%` }}
                        title={`${day.questionsAnswered} questions`}
                      />
                      <div
                        className="w-5 bg-emerald-500 rounded-t transition-all duration-300"
                        style={{ height: `${correctHeight}%` }}
                        title={`${day.correctAnswers} correct`}
                      />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {dayName}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Weekly Summary */}
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {weeklyQuestions}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Questions This Week
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {weeklyAccuracy}%
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Weekly Accuracy
                </p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {formatStudyTime(weeklyStudyTime)}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Study Time
                </p>
              </div>
            </div>
          </Card>

          {/* Strengths & Weaknesses */}
          <Card>
            <CardTitle className="mb-6">Strengths & Weaknesses</CardTitle>

            {/* Best Category */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Award size={16} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Strongest Area
                </span>
              </div>
              <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-emerald-900 dark:text-emerald-100">
                    {getCategoryDisplayName(bestCategory.category)}
                  </span>
                  <Badge variant="success">{bestCategory.accuracy.toFixed(0)}%</Badge>
                </div>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  {bestCategory.correctAnswers} of {bestCategory.totalQuestions} correct
                </p>
              </div>
            </div>

            {/* Worst Category */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Brain size={16} className="text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Needs Improvement
                </span>
              </div>
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-amber-900 dark:text-amber-100">
                    {getCategoryDisplayName(worstCategory.category)}
                  </span>
                  <Badge variant="warning">{worstCategory.accuracy.toFixed(0)}%</Badge>
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  {worstCategory.correctAnswers} of {worstCategory.totalQuestions} correct
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card className="mb-8">
          <CardTitle className="mb-6">Performance by Category</CardTitle>
          <div className="space-y-6">
            {mockCategoryPerformance.map((category) => {
              const avgTimeFormatted =
                category.averageTimeSeconds < 60
                  ? `${category.averageTimeSeconds}s`
                  : `${Math.floor(category.averageTimeSeconds / 60)}m ${category.averageTimeSeconds % 60}s`;

              return (
                <div key={category.category}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-slate-900 dark:text-white">
                        {getCategoryDisplayName(category.category)}
                      </span>
                      <Badge variant="default" size="sm">
                        {category.totalQuestions} questions
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        Avg: {avgTimeFormatted}
                      </span>
                      <span
                        className={`font-semibold ${
                          category.accuracy >= 80
                            ? "text-emerald-600 dark:text-emerald-400"
                            : category.accuracy >= 60
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {category.accuracy.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        category.accuracy >= 80
                          ? "bg-emerald-500"
                          : category.accuracy >= 60
                            ? "bg-amber-500"
                            : "bg-rose-500"
                      }`}
                      style={{ width: `${category.accuracy}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-slate-500 dark:text-slate-400">
                    <span>
                      {category.correctAnswers} correct / {category.totalQuestions - category.correctAnswers} incorrect
                    </span>
                    <span>
                      {category.accuracy >= 80
                        ? "Excellent"
                        : category.accuracy >= 60
                          ? "Good"
                          : "Needs Work"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Insights */}
        <Card>
          <CardTitle className="mb-6">AI Insights</CardTitle>
          <div className="space-y-4">
            {[
              {
                title: "You're improving!",
                description:
                  "Your accuracy has increased by 5% over the last week. Keep up the consistent practice.",
                type: "success",
              },
              {
                title: "Focus on Numerical Reasoning",
                description:
                  "This is your weakest category at 70% accuracy. We recommend dedicating extra time here.",
                type: "warning",
              },
              {
                title: "Great streak!",
                description:
                  "You've studied for 12 consecutive days. Consistency is key to exam success.",
                type: "info",
              },
              {
                title: "Time management tip",
                description:
                  "You spend an average of 95 seconds on Numerical Reasoning questions. Try to bring this under 60 seconds.",
                type: "default",
              },
            ].map((insight, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 rounded-lg ${
                  insight.type === "success"
                    ? "bg-emerald-50 dark:bg-emerald-900/20"
                    : insight.type === "warning"
                      ? "bg-amber-50 dark:bg-amber-900/20"
                      : insight.type === "info"
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : "bg-slate-50 dark:bg-slate-800/50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    insight.type === "success"
                      ? "bg-emerald-100 dark:bg-emerald-900/50"
                      : insight.type === "warning"
                        ? "bg-amber-100 dark:bg-amber-900/50"
                        : insight.type === "info"
                          ? "bg-blue-100 dark:bg-blue-900/50"
                          : "bg-slate-200 dark:bg-slate-700"
                  }`}
                >
                  <ChevronRight
                    size={16}
                    className={
                      insight.type === "success"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : insight.type === "warning"
                          ? "text-amber-600 dark:text-amber-400"
                          : insight.type === "info"
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-slate-600 dark:text-slate-400"
                    }
                  />
                </div>
                <div>
                  <h4
                    className={`font-medium mb-1 ${
                      insight.type === "success"
                        ? "text-emerald-900 dark:text-emerald-100"
                        : insight.type === "warning"
                          ? "text-amber-900 dark:text-amber-100"
                          : insight.type === "info"
                            ? "text-blue-900 dark:text-blue-100"
                            : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {insight.title}
                  </h4>
                  <p
                    className={`text-sm ${
                      insight.type === "success"
                        ? "text-emerald-700 dark:text-emerald-300"
                        : insight.type === "warning"
                          ? "text-amber-700 dark:text-amber-300"
                          : insight.type === "info"
                            ? "text-blue-700 dark:text-blue-300"
                            : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {insight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
