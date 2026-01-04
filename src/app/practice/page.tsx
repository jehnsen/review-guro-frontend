"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  FileText,
  Brain,
  Globe,
  ClipboardList,
  Play,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { Button, Card, CardTitle, Badge } from "@/components/ui";
import { mockQuestions, mockCategoryPerformance } from "@/lib/mock-data";
import { getCategoryDisplayName, QuestionCategory } from "@/lib/types";

const categoryIcons: Record<QuestionCategory, typeof Calculator> = {
  "numerical-reasoning": Calculator,
  "verbal-reasoning": FileText,
  "analytical-ability": Brain,
  "general-information": Globe,
  "clerical-operations": ClipboardList,
};

const categoryColors: Record<QuestionCategory, string> = {
  "numerical-reasoning": "blue",
  "verbal-reasoning": "purple",
  "analytical-ability": "amber",
  "general-information": "emerald",
  "clerical-operations": "rose",
};

export default function PracticeLandingPage() {
  const categories: QuestionCategory[] = [
    "numerical-reasoning",
    "verbal-reasoning",
    "analytical-ability",
    "general-information",
    "clerical-operations",
  ];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Practice Mode
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Choose a category to start practicing or continue with mixed questions.
          </p>
        </div>

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
            <Link href="/practice/q1">
              <Button variant="secondary" icon={ArrowRight} iconPosition="right">
                Start Practice
              </Button>
            </Link>
          </div>
        </Card>

        {/* Categories Grid */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Practice by Category
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {categories.map((category) => {
              const Icon = categoryIcons[category];
              const color = categoryColors[category];
              const performance = mockCategoryPerformance.find(
                (p) => p.category === category
              );
              const questionCount = mockQuestions.filter(
                (q) => q.category === category
              ).length;

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
                          {getCategoryDisplayName(category)}
                        </h3>
                        {performance && (
                          <Badge
                            variant={
                              performance.accuracy >= 80
                                ? "success"
                                : performance.accuracy >= 60
                                  ? "warning"
                                  : "danger"
                            }
                            size="sm"
                          >
                            {performance.accuracy.toFixed(0)}%
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                        {questionCount > 0
                          ? `${questionCount} questions available`
                          : "Coming soon"}
                      </p>
                      {performance && (
                        <div className="mb-3">
                          <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                performance.accuracy >= 80
                                  ? "bg-emerald-500"
                                  : performance.accuracy >= 60
                                    ? "bg-amber-500"
                                    : "bg-rose-500"
                              }`}
                              style={{ width: `${performance.accuracy}%` }}
                            />
                          </div>
                        </div>
                      )}
                      <Link
                        href={`/practice/${mockQuestions.find((q) => q.category === category)?.id || "q1"}`}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          icon={ArrowRight}
                          iconPosition="right"
                          className="group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30"
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
              <span>
                Flag difficult questions for later review
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}
