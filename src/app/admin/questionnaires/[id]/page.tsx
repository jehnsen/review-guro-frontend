"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Clock,
  Target,
  CheckCircle,
  XCircle,
  FileText,
  TrendingUp,
} from "lucide-react";
import { adminApi } from "@/server/api";

export default function QuestionnaireDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = React.useState<string | null>(null);

  React.useEffect(() => {
    params.then(p => setId(p.id));
  }, [params]);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-questionnaire", id],
    queryFn: () => adminApi.getQuestionnaire(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  const questionnaire = data?.data;
  if (!questionnaire) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Questionnaire Not Found
          </h1>
          <Link
            href="/admin/questionnaires"
            className="text-blue-600 hover:text-blue-700"
          >
            Back to Questionnaires
          </Link>
        </div>
      </div>
    );
  }

  // Calculate category distribution
  const categoryDistribution = questionnaire.questions.reduce((acc, q) => {
    acc[q.category] = (acc[q.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate difficulty distribution
  const difficultyDistribution = questionnaire.questions.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/questionnaires"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4"
        >
          <ArrowLeft size={20} />
          Back to Questionnaires
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {questionnaire.title}
              </h1>
              {questionnaire.isActive ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  <CheckCircle size={14} />
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-400">
                  <XCircle size={14} />
                  Inactive
                </span>
              )}
            </div>
            {questionnaire.description && (
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                {questionnaire.description}
              </p>
            )}
          </div>
          <Link
            href={`/admin/questionnaires/${id}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit size={20} />
            Edit
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <FileText className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {questionnaire.totalQuestions}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Total Questions
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <TrendingUp className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                #{questionnaire.number}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Questionnaire #
              </div>
            </div>
          </div>
        </div>

        {questionnaire.timeLimit && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Clock className="text-amber-600 dark:text-amber-400" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {questionnaire.timeLimit}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Minutes
                </div>
              </div>
            </div>
          </div>
        )}

        {questionnaire.passingScore && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Target className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {questionnaire.passingScore}%
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Passing Score
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Distribution Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Category Distribution */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Category Distribution
          </h2>
          <div className="space-y-3">
            {Object.entries(categoryDistribution).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {category.replace(/_/g, " ")}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(count / questionnaire.totalQuestions) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white w-12 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty Distribution */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
            Difficulty Distribution
          </h2>
          <div className="space-y-3">
            {Object.entries(difficultyDistribution).map(([difficulty, count]) => (
              <div key={difficulty} className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {difficulty}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        difficulty === "EASY"
                          ? "bg-green-600"
                          : difficulty === "MEDIUM"
                          ? "bg-amber-600"
                          : "bg-red-600"
                      }`}
                      style={{
                        width: `${(count / questionnaire.totalQuestions) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white w-12 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
          Questions ({questionnaire.questions.length})
        </h2>
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {questionnaire.questions.map((question, index) => (
            <Link
              key={question.id}
              href={`/admin/questions/${question.questionId}`}
              className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors cursor-pointer"
            >
              <div className="flex-shrink-0 w-8 text-center font-medium text-slate-600 dark:text-slate-400">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-slate-900 dark:text-white mb-2">
                  {question.questionText}
                </div>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {question.category.replace(/_/g, " ")}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      question.difficulty === "EASY"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : question.difficulty === "MEDIUM"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {question.difficulty}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
