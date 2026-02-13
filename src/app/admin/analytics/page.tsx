"use client";

import { useState, useEffect } from "react";
import {
  adminApi,
  PlatformStatistics,
  QuestionPerformanceMetrics,
  UserEngagementTrends,
  RevenueChartData,
} from "@/server/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Users,
  DollarSign,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Activity,
  Award,
  Clock,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const [platformStats, setPlatformStats] =
    useState<PlatformStatistics | null>(null);
  const [questionPerformance, setQuestionPerformance] = useState<{
    questions: QuestionPerformanceMetrics[];
    byCategory: any[];
    byDifficulty: any[];
  } | null>(null);
  const [engagement, setEngagement] = useState<UserEngagementTrends | null>(
    null
  );
  const [revenue, setRevenue] = useState<RevenueChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllAnalytics();
  }, []);

  const fetchAllAnalytics = async () => {
    try {
      setIsLoading(true);

      const [platformRes, questionRes, engagementRes, revenueRes] =
        await Promise.all([
          adminApi.getPlatformStatistics(),
          adminApi.getQuestionPerformance(20, "hardest"),
          adminApi.getEngagementTrends(30),
          adminApi.getRevenueData(30),
        ]);

      setPlatformStats(platformRes.data);
      setQuestionPerformance(questionRes.data);
      setEngagement(engagementRes.data);
      setRevenue(revenueRes.data);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Analytics Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Platform-wide statistics and performance insights
        </p>
      </div>

      {/* Platform Statistics */}
      {platformStats && (
        <>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Platform Overview
          </h2>

          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users size={18} />
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                  {platformStats.users.total}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {platformStats.users.newThisMonth} new this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award size={18} />
                  Premium Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                  {platformStats.users.premium}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {(
                    (platformStats.users.premium / platformStats.users.total) *
                    100
                  ).toFixed(1)}
                  % of total
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity size={18} />
                  Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {platformStats.users.active}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Last 30 days
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign size={18} />
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                  {formatCurrency(platformStats.revenue.total)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {platformStats.revenue.growth >= 0 ? (
                    <TrendingUp size={14} className="text-green-600" />
                  ) : (
                    <TrendingDown size={14} className="text-red-600" />
                  )}
                  <p
                    className={`text-sm ${
                      platformStats.revenue.growth >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {platformStats.revenue.growth.toFixed(1)}% growth
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Stats */}
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-8">
            Question Bank
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen size={18} />
                  Total Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-700 dark:text-purple-400">
                  {platformStats.questions.total}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Practice Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                  {platformStats.activity.totalPracticeQuestions}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Mock Exams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
                  {platformStats.activity.totalMockExams}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                  {platformStats.activity.completionRate.toFixed(1)}%
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Question Performance */}
      {questionPerformance && (
        <>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-8">
            Question Performance
          </h2>

          {/* Accuracy by Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Accuracy by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {questionPerformance.byCategory.map((cat: any) => (
                    <div key={cat.category}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {cat.category.replace(/_/g, " ")}
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {cat.accuracy.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${cat.accuracy}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accuracy by Difficulty</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {questionPerformance.byDifficulty.map((diff: any) => (
                    <div key={diff.difficulty}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {diff.difficulty}
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {diff.accuracy.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${diff.accuracy}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hardest Questions */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Hardest Questions (Lowest Accuracy)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                        Question
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                        Difficulty
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                        Attempts
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                        Accuracy
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                        Avg Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {questionPerformance.questions.slice(0, 10).map((q) => (
                      <tr key={q.questionId}>
                        <td className="px-4 py-3 text-sm text-slate-900 dark:text-white max-w-xs truncate">
                          {q.questionText}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                          <Badge variant="default">
                            {q.category.replace(/_/g, " ")}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Badge
                            variant={
                              q.difficulty === "HARD"
                                ? "danger"
                                : q.difficulty === "MEDIUM"
                                  ? "warning"
                                  : "success"
                            }
                          >
                            {q.difficulty}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">
                          {q.totalAttempts}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={
                              q.accuracyRate < 30
                                ? "text-red-600 font-semibold"
                                : q.accuracyRate < 50
                                  ? "text-amber-600 font-semibold"
                                  : "text-green-600 font-semibold"
                            }
                          >
                            {q.accuracyRate.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                          {Math.round(q.averageTimeSeconds)}s
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Revenue Overview */}
      {revenue && revenue.monthly.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-8">
            Revenue Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue (Last 6 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {revenue.monthly.slice(0, 6).map((month) => (
                    <div key={month.month}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {month.month}
                        </span>
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {formatCurrency(month.revenue)}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {month.count} transactions
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {revenue.byPaymentMethod.map((method) => (
                    <div key={method.method}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                          {method.method}
                        </span>
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {formatCurrency(method.revenue)}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {method.count} transactions
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
