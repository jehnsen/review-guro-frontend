"use client";

import { QuestionWithAnswer } from "@/server/api";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

interface QuestionTableProps {
  questions: QuestionWithAnswer[];
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
  VERBAL_ABILITY: "Verbal",
  NUMERICAL_ABILITY: "Numerical",
  ANALYTICAL_ABILITY: "Analytical",
  GENERAL_INFORMATION: "General Info",
  CLERICAL_ABILITY: "Clerical",
};

const DIFFICULTY_COLORS: Record<string, "success" | "warning" | "danger"> = {
  EASY: "success",
  MEDIUM: "warning",
  HARD: "danger",
};

export function QuestionTable({
  questions,
  onDelete,
  isLoading,
}: QuestionTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-8">
        <div className="text-center">
          <p className="text-slate-500 dark:text-slate-400">
            No questions found. Try adjusting your filters or create a new question.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Question
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Q#
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {questions.map((question) => (
              <tr
                key={question.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <td className="px-4 py-4">
                  <Link
                    href={`/admin/questions/${question.id}`}
                    className="block text-sm text-slate-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {question.questionText}
                  </Link>
                </td>
                <td className="px-4 py-4">
                  <Link
                    href={`/admin/questions/${question.id}`}
                    className="block text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {CATEGORY_LABELS[question.category]}
                  </Link>
                </td>
                <td className="px-4 py-4">
                  <Link
                    href={`/admin/questions/${question.id}`}
                    className="block"
                  >
                    <Badge variant={DIFFICULTY_COLORS[question.difficulty]}>
                      {question.difficulty}
                    </Badge>
                  </Link>
                </td>
                <td className="px-4 py-4">
                  <Link
                    href={`/admin/questions/${question.id}`}
                    className="block text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {question.questionnaireNumber || "-"}
                  </Link>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/questions/${question.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit2 size={14} className="mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(question.id)}
                    >
                      <Trash2 size={14} className="mr-1" />
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-slate-200 dark:divide-slate-700">
        {questions.map((question) => (
          <div key={question.id} className="p-4">
            <Link
              href={`/admin/questions/${question.id}`}
              className="flex items-start justify-between gap-4 mb-3 block"
            >
              <div className="flex-1">
                <p className="text-sm text-slate-900 dark:text-white line-clamp-2 mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                  {question.questionText}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    {CATEGORY_LABELS[question.category]}
                  </span>
                  <Badge variant={DIFFICULTY_COLORS[question.difficulty]} className="text-xs">
                    {question.difficulty}
                  </Badge>
                  {question.questionnaireNumber && (
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      Q#{question.questionnaireNumber}
                    </span>
                  )}
                </div>
              </div>
            </Link>
            <div className="flex gap-2">
              <Link href={`/admin/questions/${question.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  <Edit2 size={14} className="mr-1" />
                  Edit
                </Button>
              </Link>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(question.id)}
                className="flex-1"
              >
                <Trash2 size={14} className="mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
