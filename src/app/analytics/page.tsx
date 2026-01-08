"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Award,
  BookOpen,
  Brain,
  Zap,
  ChevronRight,
  Loader2,
  FileText,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { Card, CardTitle, Badge } from "@/components/ui";
import {
  analyticsApi,
  DashboardOverview,
  WeeklyActivityResponse,
  StrengthsWeaknessesResponse,
  PerformanceByCategoryResponse,
  AIInsightsResponse,
  categoryDisplayNames,
} from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function AnalyticsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboard, setDashboard] = useState<DashboardOverview | null>(null);
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivityResponse | null>(null);
  const [strengthsWeaknesses, setStrengthsWeaknesses] = useState<StrengthsWeaknessesResponse | null>(null);
  const [performanceByCategory, setPerformanceByCategory] = useState<PerformanceByCategoryResponse | null>(null);
  const [aiInsights, setAiInsights] = useState<AIInsightsResponse | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      if (!isAuthenticated) return;

      setIsLoading(true);
      try {
        // Fetch all analytics data in parallel
        const [
          dashboardRes,
          weeklyRes,
          strengthsRes,
          performanceRes,
          insightsRes,
        ] = await Promise.all([
          analyticsApi.getDashboard().catch(() => null),
          analyticsApi.getWeeklyActivity().catch(() => null),
          analyticsApi.getStrengthsWeaknesses().catch(() => null),
          analyticsApi.getPerformanceByCategory().catch(() => null),
          analyticsApi.getAIInsights().catch(() => null),
        ]);

        if (dashboardRes?.data) setDashboard(dashboardRes.data);
        if (weeklyRes?.data) setWeeklyActivity(weeklyRes.data);
        if (strengthsRes?.data) {
          // Combine all categories and filter/sort properly
          // Strengths: categories with accuracy >= 50%, sorted descending
          // Weaknesses: categories with accuracy < 50%, sorted ascending
          const allCategories = [
            ...(strengthsRes.data.strengths || []),
            ...(strengthsRes.data.weaknesses || []),
          ];

          // Remove duplicates by category name
          const uniqueCategories = allCategories.reduce((acc, curr) => {
            if (!acc.find(item => item.category === curr.category)) {
              acc.push(curr);
            }
            return acc;
          }, [] as typeof allCategories);

          const sortedData = {
            strengths: uniqueCategories
              .filter(c => c.accuracy >= 50)
              .sort((a, b) => b.accuracy - a.accuracy),
            weaknesses: uniqueCategories
              .filter(c => c.accuracy < 50)
              .sort((a, b) => a.accuracy - b.accuracy),
          };
          setStrengthsWeaknesses(sortedData);
        }
        if (performanceRes?.data) {
          // Handle different response formats - API might return categories directly or nested
          const categories = Array.isArray(performanceRes.data)
            ? performanceRes.data
            : performanceRes.data.categories || [];
          setPerformanceByCategory({ categories });
        }
        if (insightsRes?.data) setAiInsights(insightsRes.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (!authLoading) {
      fetchAnalytics();
    }
  }, [isAuthenticated, authLoading]);

  // Format study time from hours and minutes
  const formatStudyTime = (studyTime: { hours: number; minutes: number } | undefined) => {
    if (!studyTime) return "0h 0m";
    const { hours, minutes } = studyTime;
    if (hours === 0) return `${minutes}m`;
    return `${hours}h ${minutes}m`;
  };

  // Calculate weekly stats from weekly activity data
  const weeklyStats = weeklyActivity?.data?.reduce(
    (acc, day) => ({
      totalQuestions: acc.totalQuestions + day.questionsAttempted,
      correctAnswers: acc.correctAnswers + day.correctAnswers,
    }),
    { totalQuestions: 0, correctAnswers: 0 }
  ) || { totalQuestions: 0, correctAnswers: 0 };

  const weeklyAccuracy = weeklyStats.totalQuestions > 0
    ? Math.round((weeklyStats.correctAnswers / weeklyStats.totalQuestions) * 100)
    : 0;

  // Calculate max for chart scaling
  const maxQuestions = weeklyActivity?.data
    ? Math.max(...weeklyActivity.data.map((d) => d.questionsAttempted), 1)
    : 1;

  if (authLoading || isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

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
              {dashboard && dashboard.totalQuestions > 0 && (
                <Badge variant="success" size="sm">
                  <TrendingUp size={12} className="mr-1" />
                  Active
                </Badge>
              )}
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {dashboard?.totalQuestions || 0}
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
              {dashboard && (
                <Badge
                  variant={(dashboard.accuracy || 0) >= 80 ? "success" : "warning"}
                  size="sm"
                >
                  {(dashboard.accuracy || 0) >= 80 ? (
                    <TrendingUp size={12} className="mr-1" />
                  ) : (
                    <TrendingDown size={12} className="mr-1" />
                  )}
                  {(dashboard.accuracy || 0) >= 80 ? "Great" : "Improve"}
                </Badge>
              )}
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {(dashboard?.accuracy || 0).toFixed(1)}%
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
                Total
              </Badge>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {formatStudyTime(dashboard?.studyTime)}
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
              {dashboard?.streak && dashboard.streak.current > 0 && (
                <Badge variant="warning" size="sm">
                  Active
                </Badge>
              )}
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {dashboard?.streak?.current || 0} days
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Current Streak {dashboard?.streak?.longest ? `(Best: ${dashboard.streak.longest})` : ""}
            </p>
          </Card>
        </div>

        {/* Mock Exam Stats */}
        {dashboard?.mockExams && dashboard.mockExams.total > 0 && (
          <Card className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                <FileText size={20} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <CardTitle>Mock Exam Performance</CardTitle>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {dashboard.mockExams.total}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total Exams</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {dashboard.mockExams.completed}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Completed</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {dashboard.mockExams.averageScore.toFixed(1)}%
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Average Score</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {dashboard.mockExams.passRate.toFixed(0)}%
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Pass Rate</p>
              </div>
            </div>
          </Card>
        )}

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
              {weeklyActivity?.data && weeklyActivity.data.length > 0 ? (
                weeklyActivity.data.map((day) => {
                  const questionHeight = (day.questionsAttempted / maxQuestions) * 100;
                  const correctHeight = (day.correctAnswers / maxQuestions) * 100;

                  return (
                    <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex items-end justify-center gap-1 h-40">
                        <div
                          className="w-5 bg-blue-500 rounded-t transition-all duration-300"
                          style={{ height: `${Math.max(questionHeight, 2)}%` }}
                          title={`${day.questionsAttempted} questions`}
                        />
                        <div
                          className="w-5 bg-emerald-500 rounded-t transition-all duration-300"
                          style={{ height: `${Math.max(correctHeight, 2)}%` }}
                          title={`${day.correctAnswers} correct`}
                        />
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {day.day}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="flex-1 flex items-center justify-center h-40 text-slate-400">
                  No activity data yet. Start practicing!
                </div>
              )}
            </div>

            {/* Weekly Summary */}
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {weeklyStats.totalQuestions}
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
                  {weeklyStats.correctAnswers}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Correct Answers
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
                  Strongest Areas
                </span>
              </div>
              {strengthsWeaknesses?.strengths && strengthsWeaknesses.strengths.length > 0 ? (
                <div className="space-y-2">
                  {strengthsWeaknesses.strengths.slice(0, 2).map((category) => (
                    <div
                      key={category.category}
                      className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-emerald-900 dark:text-emerald-100 text-sm">
                          {categoryDisplayNames[category.category]}
                        </span>
                        <Badge variant="success" size="sm">{category.accuracy.toFixed(0)}%</Badge>
                      </div>
                      <p className="text-xs text-emerald-700 dark:text-emerald-300">
                        {Math.round(category.accuracy * category.totalAttempted / 100)} of {category.totalAttempted} correct
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Answer more questions to see your strengths
                </p>
              )}
            </div>

            {/* Worst Category */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Brain size={16} className="text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Needs Improvement
                </span>
              </div>
              {strengthsWeaknesses?.weaknesses && strengthsWeaknesses.weaknesses.length > 0 ? (
                <div className="space-y-2">
                  {strengthsWeaknesses.weaknesses.slice(0, 2).map((category) => (
                    <div
                      key={category.category}
                      className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-amber-900 dark:text-amber-100 text-sm">
                          {categoryDisplayNames[category.category]}
                        </span>
                        <Badge variant="warning" size="sm">{category.accuracy.toFixed(0)}%</Badge>
                      </div>
                      <p className="text-xs text-amber-700 dark:text-amber-300">
                        {Math.round(category.accuracy * category.totalAttempted / 100)} of {category.totalAttempted} correct
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Answer more questions to identify areas for improvement
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card className="mb-8">
          <CardTitle className="mb-6">Performance by Category</CardTitle>
          <div className="space-y-6">
            {performanceByCategory?.categories && performanceByCategory.categories.length > 0 ? (
              performanceByCategory.categories.map((category) => {
                // Handle different field names from API
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const attempted = category.attemptedQuestions || (category as any).totalAttempted || 0;
                const correct = category.correctAnswers || 0;
                const incorrect = attempted - correct;
                const avgTime = category.averageTimeSeconds || 0;

                const avgTimeFormatted =
                  avgTime < 60
                    ? `${Math.round(avgTime)}s`
                    : `${Math.floor(avgTime / 60)}m ${Math.round(avgTime % 60)}s`;

                const performanceLabel = category.accuracy >= 80
                  ? "Excellent"
                  : category.accuracy >= 60
                    ? "Good"
                    : "Needs Work";

                return (
                  <div key={category.category} className="space-y-2">
                    {/* Header row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {categoryDisplayNames[category.category]}
                        </span>
                        <Badge variant="default" size="sm" className="rounded-full">
                          {attempted} questions
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        {avgTime > 0 && (
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            Avg: {avgTimeFormatted}
                          </span>
                        )}
                        <span
                          className={`font-bold text-lg ${
                            category.accuracy >= 80
                              ? "text-emerald-600 dark:text-emerald-400"
                              : category.accuracy >= 60
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-orange-600 dark:text-orange-400"
                          }`}
                        >
                          {category.accuracy.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          category.accuracy >= 80
                            ? "bg-emerald-500"
                            : category.accuracy >= 60
                              ? "bg-blue-500"
                              : "bg-orange-500"
                        }`}
                        style={{ width: `${category.accuracy}%` }}
                      />
                    </div>
                    {/* Footer row */}
                    <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                      <span>
                        {correct} correct / {incorrect} incorrect
                      </span>
                      <span className={`font-medium ${
                        category.accuracy >= 80
                          ? "text-emerald-600 dark:text-emerald-400"
                          : category.accuracy >= 60
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-orange-600 dark:text-orange-400"
                      }`}>
                        {performanceLabel}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                No category performance data yet. Start practicing to see your progress!
              </div>
            )}
          </div>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardTitle className="mb-6">AI Insights</CardTitle>
          {aiInsights ? (
            <div className="space-y-4">
              {/* Overall Assessment */}
              {aiInsights.overallAssessment && (
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <p className="text-blue-800 dark:text-blue-200">
                    {aiInsights.overallAssessment}
                  </p>
                </div>
              )}

              {/* Encouragement */}
              {aiInsights.encouragement && (
                <div className="flex items-start gap-4 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
                    <Zap size={16} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-emerald-900 dark:text-emerald-100 mb-1">
                      Keep it up!
                    </h4>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      {aiInsights.encouragement}
                    </p>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {aiInsights.recommendations && aiInsights.recommendations.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900 dark:text-white">
                    Recommendations
                  </h4>
                  {aiInsights.recommendations.map((recommendation, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                        <ChevronRight size={16} className="text-slate-600 dark:text-slate-400" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 pt-1.5">
                        {recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Focus Areas */}
              {aiInsights.focusAreas && aiInsights.focusAreas.length > 0 && (
                <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain size={16} className="text-amber-600 dark:text-amber-400" />
                    <span className="font-medium text-amber-900 dark:text-amber-100">
                      Focus Areas
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {aiInsights.focusAreas.map((area) => (
                      <Badge key={area} variant="warning">
                        {categoryDisplayNames[area]}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              Complete more practice questions to receive personalized AI insights!
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
