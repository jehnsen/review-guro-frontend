"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  GripVertical,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import {
  adminApi,
  UpdateQuestionnaireRequest,
  QuestionnaireQuestionResponse,
  QuestionWithAnswer,
} from "@/server/api";
import { AlertDialog } from "@/components/ui/AlertDialog";

export default function EditQuestionnairePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [id, setId] = React.useState<string | null>(null);
  const [formData, setFormData] = useState<UpdateQuestionnaireRequest>({});
  const [showQuestionSelector, setShowQuestionSelector] = useState(false);
  const [questionSearch, setQuestionSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Alert dialog state
  const [alertDialog, setAlertDialog] = useState<{
    isOpen: boolean;
    type: "success" | "error" | "warning" | "info";
    title?: string;
    message: string;
    onConfirm?: () => void;
    showCancel?: boolean;
  }>({
    isOpen: false,
    type: "info",
    message: "",
  });

  const [questionToRemove, setQuestionToRemove] = useState<string | null>(null);

  React.useEffect(() => {
    params.then(p => setId(p.id));
  }, [params]);

  // Fetch questionnaire
  const { data: questionnaireData, isLoading } = useQuery({
    queryKey: ["admin-questionnaire", id],
    queryFn: () => adminApi.getQuestionnaire(id!),
    enabled: !!id,
  });

  // Populate form data when questionnaire data is loaded
  useEffect(() => {
    if (questionnaireData?.data) {
      setFormData({
        title: questionnaireData.data.title,
        description: questionnaireData.data.description || "",
        number: questionnaireData.data.number,
        isActive: questionnaireData.data.isActive,
        difficulty: questionnaireData.data.difficulty || undefined,
        timeLimit: questionnaireData.data.timeLimit || undefined,
        passingScore: questionnaireData.data.passingScore || undefined,
      });
    }
  }, [questionnaireData]);

  // Fetch available questions
  const { data: availableQuestionsData } = useQuery({
    queryKey: ["admin-questions", questionSearch, selectedCategory],
    queryFn: () =>
      adminApi.listQuestions({
        search: questionSearch || undefined,
        category: selectedCategory as any,
        limit: 50,
      }),
    enabled: showQuestionSelector,
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: UpdateQuestionnaireRequest) =>
      adminApi.updateQuestionnaire(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-questionnaire", id] });
      setAlertDialog({
        isOpen: true,
        type: "success",
        title: "Success!",
        message: "Questionnaire updated successfully!",
      });
    },
  });

  // Add questions mutation
  const addQuestionsMutation = useMutation({
    mutationFn: (questionIds: string[]) =>
      adminApi.addQuestionsToQuestionnaire(id!, questionIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-questionnaire", id] });
      setShowQuestionSelector(false);
    },
  });

  // Remove question mutation
  const removeQuestionMutation = useMutation({
    mutationFn: (questionId: string) =>
      adminApi.removeQuestionFromQuestionnaire(id!, questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-questionnaire", id] });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync(formData);
    } catch (error: any) {
      setAlertDialog({
        isOpen: true,
        type: "error",
        title: "Error",
        message: error?.message || "Failed to update questionnaire. Please try again.",
      });
    }
  };

  const handleChange = (field: keyof UpdateQuestionnaireRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddQuestion = async (questionId: string) => {
    try {
      await addQuestionsMutation.mutateAsync([questionId]);
    } catch (error: any) {
      setAlertDialog({
        isOpen: true,
        type: "error",
        title: "Error",
        message: error?.message || "Failed to add question. Please try again.",
      });
    }
  };

  const handleRemoveQuestion = (questionId: string) => {
    setQuestionToRemove(questionId);
    setAlertDialog({
      isOpen: true,
      type: "warning",
      title: "Remove Question?",
      message: "Are you sure you want to remove this question from the questionnaire?",
      showCancel: true,
      onConfirm: confirmRemoveQuestion,
    });
  };

  const confirmRemoveQuestion = async () => {
    if (!questionToRemove) return;

    try {
      await removeQuestionMutation.mutateAsync(questionToRemove);
      setQuestionToRemove(null);
    } catch (error: any) {
      setAlertDialog({
        isOpen: true,
        type: "error",
        title: "Error",
        message: error?.message || "Failed to remove question. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  const questionnaire = questionnaireData?.data;
  if (!questionnaire) {
    return <div>Questionnaire not found</div>;
  }

  const existingQuestionIds = new Set(
    questionnaire.questions.map((q) => q.questionId)
  );

  return (
    <>
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
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Edit Questionnaire
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Update questionnaire details and manage questions
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Basic Information
          </h2>

          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Description
            </label>
            <textarea
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Number <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={formData.number || ""}
                onChange={(e) => handleChange("number", parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Status
              </label>
              <select
                value={formData.isActive ? "true" : "false"}
                onChange={(e) => handleChange("isActive", e.target.value === "true")}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Difficulty Level
            </label>
            <select
              value={formData.difficulty || ""}
              onChange={(e) =>
                handleChange("difficulty", e.target.value || undefined)
              }
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
            >
              <option value="">Mixed Difficulty</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Time Limit (minutes)
              </label>
              <input
                type="number"
                min="1"
                value={formData.timeLimit || ""}
                onChange={(e) =>
                  handleChange(
                    "timeLimit",
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Passing Score (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.passingScore || ""}
                onChange={(e) =>
                  handleChange(
                    "passingScore",
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Questions Management */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Questions ({questionnaire.questions.length})
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Manage questions in this questionnaire
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowQuestionSelector(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Add Questions
            </button>
          </div>

          {questionnaire.questions.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              No questions added yet. Click "Add Questions" to get started.
            </div>
          ) : (
            <div className="space-y-2">
              {questionnaire.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
                >
                  <div className="text-slate-400 cursor-move">
                    <GripVertical size={20} />
                  </div>
                  <div className="flex-shrink-0 w-8 text-center font-medium text-slate-600 dark:text-slate-400">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      {question.questionText}
                    </div>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {question.category.replace(/_/g, " ")}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-600 dark:text-slate-300">
                        {question.difficulty}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(question.questionId)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400"
                    disabled={removeQuestionMutation.isPending}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>

      {/* Question Selector Modal */}
      {showQuestionSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                Add Questions
              </h3>
              <button
                onClick={() => setShowQuestionSelector(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X size={24} />
              </button>
            </div>

            {/* Search and Filters */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 space-y-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={questionSearch}
                  onChange={(e) => setQuestionSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              >
                <option value="">All Categories</option>
                <option value="VERBAL_ABILITY">Verbal Ability</option>
                <option value="NUMERICAL_ABILITY">Numerical Ability</option>
                <option value="ANALYTICAL_ABILITY">Analytical Ability</option>
                <option value="GENERAL_INFORMATION">General Information</option>
                <option value="CLERICAL_ABILITY">Clerical Ability</option>
              </select>
            </div>

            {/* Questions List */}
            <div className="flex-1 overflow-y-auto p-4">
              {availableQuestionsData?.data.map((question) => (
                <div
                  key={question.id}
                  className={`p-4 mb-2 rounded-lg border ${
                    existingQuestionIds.has(question.id)
                      ? "bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 opacity-50"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-500 cursor-pointer"
                  }`}
                  onClick={() => {
                    if (!existingQuestionIds.has(question.id)) {
                      handleAddQuestion(question.id);
                    }
                  }}
                >
                  <div className="text-sm text-slate-900 dark:text-white mb-2">
                    {question.questionText}
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      {question.category.replace(/_/g, " ")}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-600 dark:text-slate-300">
                      {question.difficulty}
                    </span>
                    {existingQuestionIds.has(question.id) && (
                      <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        Already Added
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={alertDialog.isOpen}
        onClose={() => setAlertDialog({ ...alertDialog, isOpen: false })}
        type={alertDialog.type}
        title={alertDialog.title}
        message={alertDialog.message}
        confirmText="OK"
        cancelText="Cancel"
        showCancel={alertDialog.showCancel}
        onConfirm={alertDialog.onConfirm}
      />
    </>
  );
}
