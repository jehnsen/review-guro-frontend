"use client";

import Link from "next/link";
import {
  BookOpen,
  Target,
  TrendingUp,
  Clock,
  Calendar,
  ArrowRight,
  Flame,
  AlertCircle,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { Button, Card, CardTitle, Badge } from "@/components/ui";
import {
  mockUser,
  mockCategoryPerformance,
  mockDailyProgress,
  getDaysUntilExam,
  formatStudyTime,
} from "@/lib/mock-data";
import { getCategoryDisplayName } from "@/lib/types";

export default function DashboardPage() {
  const daysUntilExam = getDaysUntilExam(mockUser.examDate);
  const greeting = getGreeting();
  const todayProgress = mockDailyProgress[mockDailyProgress.length - 1];

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Banner */}
        <div className="bg-linear-to-r from-blue-600 to-blue-700 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute right-20 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />

          <div className="relative">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              {greeting}, {mockUser.firstName}!
            </h1>
            <p className="text-blue-100 mb-6">
              {daysUntilExam > 0 ? (
                <>
                  <span className="font-semibold text-white">
                    {daysUntilExam} days
                  </span>{" "}
                  until your Civil Service Exam. Keep up the momentum!
                </>
              ) : (
                "Your exam is today! You've got this!"
              )}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/practice/q1">
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
                {mockUser.stats.questionsAnswered}
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
                {mockUser.stats.accuracy.toFixed(1)}%
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
                {mockUser.stats.streakDays}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Day Streak
              </p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
              <Clock size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {formatStudyTime(mockUser.stats.totalStudyTimeMinutes)}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Study Time
              </p>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Performance */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weak Areas Alert */}
            <Card className="border-l-4 border-l-amber-500">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                  <AlertCircle
                    size={20}
                    className="text-amber-600 dark:text-amber-400"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                    Focus Area: {getCategoryDisplayName(mockUser.stats.weakestCategory)}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Based on your recent performance, we recommend spending more time
                    on this subject to improve your overall score.
                  </p>
                  <Link href="/practice?category=numerical-reasoning">
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

              <div className="space-y-4">
                {mockCategoryPerformance.map((cat) => (
                  <div key={cat.category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {getCategoryDisplayName(cat.category)}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {cat.correctAnswers}/{cat.totalQuestions}
                        </span>
                        <Badge
                          variant={
                            cat.accuracy >= 80
                              ? "success"
                              : cat.accuracy >= 60
                                ? "warning"
                                : "danger"
                          }
                          size="sm"
                        >
                          {cat.accuracy.toFixed(0)}%
                        </Badge>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          cat.accuracy >= 80
                            ? "bg-emerald-500"
                            : cat.accuracy >= 60
                              ? "bg-amber-500"
                              : "bg-rose-500"
                        }`}
                        style={{ width: `${cat.accuracy}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Weekly Progress */}
            <Card>
              <CardTitle className="mb-6">This Week&apos;s Progress</CardTitle>
              <div className="grid grid-cols-7 gap-2">
                {mockDailyProgress.map((day, index) => {
                  const date = new Date(day.date);
                  const dayName = date.toLocaleDateString("en-US", {
                    weekday: "short",
                  });
                  const isToday = index === mockDailyProgress.length - 1;

                  return (
                    <div
                      key={day.date}
                      className={`text-center p-3 rounded-lg ${
                        isToday
                          ? "bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800"
                          : "bg-slate-50 dark:bg-slate-800"
                      }`}
                    >
                      <p
                        className={`text-xs font-medium mb-1 ${
                          isToday
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {dayName}
                      </p>
                      <p
                        className={`text-lg font-bold ${
                          isToday
                            ? "text-blue-700 dark:text-blue-300"
                            : "text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {day.questionsAnswered}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        questions
                      </p>
                    </div>
                  );
                })}
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
              <div className="text-center py-4">
                <p className="text-5xl font-bold mb-2">{daysUntilExam}</p>
                <p className="text-slate-400">days remaining</p>
              </div>
              <div className="text-center text-sm text-slate-400">
                {new Date(mockUser.examDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </Card>

            {/* Quick Practice */}
            <Card>
              <CardTitle className="mb-4">Quick Practice</CardTitle>
              <div className="space-y-2">
                {[
                  {
                    category: "numerical-reasoning",
                    name: "Numerical Reasoning",
                    questions: 120,
                  },
                  {
                    category: "verbal-reasoning",
                    name: "Verbal Reasoning",
                    questions: 95,
                  },
                  {
                    category: "analytical-ability",
                    name: "Analytical Ability",
                    questions: 67,
                  },
                  {
                    category: "general-information",
                    name: "General Information",
                    questions: 45,
                  },
                ].map((item) => (
                  <Link
                    key={item.category}
                    href={`/practice?category=${item.category}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {item.questions} questions
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                ))}
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
                      todayProgress.questionsAnswered >= 25
                        ? "text-emerald-500"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Answer 25 questions
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {todayProgress.questionsAnswered}/25 completed
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className={`${
                      todayProgress.studyTimeMinutes >= 30
                        ? "text-emerald-500"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Study for 30 minutes
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {todayProgress.studyTimeMinutes}/30 minutes
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={20}
                    className={`${
                      (todayProgress.correctAnswers / todayProgress.questionsAnswered) *
                        100 >=
                      80
                        ? "text-emerald-500"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Maintain 80% accuracy
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Currently at{" "}
                      {(
                        (todayProgress.correctAnswers /
                          todayProgress.questionsAnswered) *
                        100
                      ).toFixed(0)}
                      %
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Streak Motivation */}
            <Card className="bg-linear-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                  <Flame size={24} className="text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-amber-900 dark:text-amber-100">
                    {mockUser.stats.streakDays} Day Streak!
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Keep it going to unlock rewards
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
