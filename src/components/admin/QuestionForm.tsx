"use client";

import { useState, useEffect } from "react";
import { Question, QuestionWithAnswer, CreateQuestionRequest, QuestionOption } from "@/server/api";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Plus, Trash2 } from "lucide-react";

interface QuestionFormProps {
  initialData?: QuestionWithAnswer;
  onSubmit: (data: CreateQuestionRequest) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
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

export function QuestionForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: QuestionFormProps) {
  // Form state
  const [questionText, setQuestionText] = useState(initialData?.questionText || "");
  const [category, setCategory] = useState(initialData?.category || "VERBAL_ABILITY");
  const [difficulty, setDifficulty] = useState(initialData?.difficulty || "MEDIUM");
  const [questionnaireNumber, setQuestionnaireNumber] = useState(
    initialData?.questionnaireNumber?.toString() || "1"
  );
  const [options, setOptions] = useState<QuestionOption[]>(
    initialData?.options || [
      { id: "a", text: "" },
      { id: "b", text: "" },
    ]
  );
  const [correctOptionId, setCorrectOptionId] = useState(
    initialData?.correctOptionId || ""
  );
  const [explanationText, setExplanationText] = useState(
    initialData?.explanationText || ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!questionText.trim()) {
      newErrors.questionText = "Question text is required";
    } else if (questionText.length > 5000) {
      newErrors.questionText = "Question text must not exceed 5000 characters";
    }

    if (options.length < 2) {
      newErrors.options = "At least 2 options are required";
    }

    if (options.length > 6) {
      newErrors.options = "Maximum 6 options allowed";
    }

    for (const option of options) {
      if (!option.text.trim()) {
        newErrors.options = "All options must have text";
        break;
      }
    }

    if (!correctOptionId) {
      newErrors.correctOptionId = "Please select the correct answer";
    }

    if (explanationText && explanationText.length > 5000) {
      newErrors.explanationText = "Explanation must not exceed 5000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const data: CreateQuestionRequest = {
      questionText,
      category: category as CreateQuestionRequest["category"],
      difficulty: difficulty as CreateQuestionRequest["difficulty"],
      options,
      correctOptionId,
      explanationText: explanationText.trim() || undefined,
      questionnaireNumber: questionnaireNumber ? parseInt(questionnaireNumber) : undefined,
    };

    await onSubmit(data);
  };

  // Options management
  const addOption = () => {
    if (options.length >= 6) {
      return;
    }

    const nextId = String.fromCharCode(97 + options.length); // a, b, c, d, e, f
    setOptions([...options, { id: nextId, text: "" }]);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) {
      return;
    }

    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);

    // If removed option was the correct answer, reset it
    if (correctOptionId === options[index].id) {
      setCorrectOptionId("");
    }
  };

  const updateOption = (index: number, text: string) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], text };
    setOptions(newOptions);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Question Text */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Question Text <span className="text-red-500">*</span>
        </label>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter the question text..."
        />
        {errors.questionText && (
          <p className="text-red-500 text-sm mt-1">{errors.questionText}</p>
        )}
        <p className="text-xs text-slate-500 mt-1">
          {questionText.length} / 5000 characters
        </p>
      </div>

      {/* Category and Difficulty */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Question["category"])}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Difficulty <span className="text-red-500">*</span>
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Question["difficulty"])}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {DIFFICULTIES.map((diff) => (
              <option key={diff.value} value={diff.value}>
                {diff.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Questionnaire Number */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Questionnaire Number (Optional)
        </label>
        <input
          type="number"
          min="1"
          value={questionnaireNumber}
          onChange={(e) => setQuestionnaireNumber(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="1"
        />
      </div>

      {/* Options */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Answer Options <span className="text-red-500">*</span>
          </label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addOption}
            disabled={options.length >= 6}
          >
            <Plus size={14} className="mr-1" />
            Add Option
          </Button>
        </div>

        <div className="space-y-3">
          {options.map((option, index) => (
            <div key={option.id} className="flex items-center gap-3">
              <input
                type="radio"
                name="correctOption"
                checked={correctOptionId === option.id}
                onChange={() => setCorrectOptionId(option.id)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Option ${option.id.toUpperCase()}`}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={() => removeOption(index)}
                disabled={options.length <= 2}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>

        {errors.options && (
          <p className="text-red-500 text-sm mt-2">{errors.options}</p>
        )}
        {errors.correctOptionId && (
          <p className="text-red-500 text-sm mt-2">{errors.correctOptionId}</p>
        )}
        <p className="text-xs text-slate-500 mt-2">
          Select the radio button next to the correct answer
        </p>
      </div>

      {/* Explanation */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Explanation (Optional)
        </label>
        <textarea
          value={explanationText}
          onChange={(e) => setExplanationText(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Provide an explanation for the correct answer..."
        />
        {errors.explanationText && (
          <p className="text-red-500 text-sm mt-1">{errors.explanationText}</p>
        )}
        <p className="text-xs text-slate-500 mt-1">
          {explanationText.length} / 5000 characters
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? "Saving..." : initialData ? "Update Question" : "Create Question"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
