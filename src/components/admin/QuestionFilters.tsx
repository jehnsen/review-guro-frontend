"use client";

import { AdminQuestionFilters } from "@/server/api";
import { Button } from "../ui/Button";
import { X } from "lucide-react";

interface QuestionFiltersProps {
  filters: AdminQuestionFilters;
  onFilterChange: (filters: AdminQuestionFilters) => void;
  onClearFilters: () => void;
}

const CATEGORIES = [
  { value: "VERBAL_ABILITY", label: "Verbal Ability" },
  { value: "NUMERICAL_ABILITY", label: "Numerical Ability" },
  { value: "ANALYTICAL_ABILITY", label: "Analytical Ability" },
  { value: "GENERAL_INFORMATION", label: "General Information" },
  { value: "CLERICAL_ABILITY", label: "Clerical Ability" },
];

const DIFFICULTIES = [
  { value: "EASY", label: "Easy" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HARD", label: "Hard" },
];

export function QuestionFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: QuestionFiltersProps) {
  const hasActiveFilters =
    filters.category || filters.difficulty || filters.questionnaireNumber;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            value={filters.category || ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                category: e.target.value as AdminQuestionFilters["category"] || undefined,
              })
            }
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label
            htmlFor="difficulty"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >
            Difficulty
          </label>
          <select
            id="difficulty"
            value={filters.difficulty || ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                difficulty: e.target.value as AdminQuestionFilters["difficulty"] || undefined,
              })
            }
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Difficulties</option>
            {DIFFICULTIES.map((diff) => (
              <option key={diff.value} value={diff.value}>
                {diff.label}
              </option>
            ))}
          </select>
        </div>

        {/* Questionnaire Number Filter */}
        <div>
          <label
            htmlFor="questionnaireNumber"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >
            Questionnaire #
          </label>
          <input
            id="questionnaireNumber"
            type="number"
            min="1"
            placeholder="All"
            value={filters.questionnaireNumber || ""}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                questionnaireNumber: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            className="w-full"
          >
            <X size={16} className="mr-2" />
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
