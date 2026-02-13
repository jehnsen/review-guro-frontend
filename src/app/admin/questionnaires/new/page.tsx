"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, Plus, Save } from "lucide-react";
import Link from "next/link";
import { adminApi, CreateQuestionnaireRequest } from "@/server/api";
import { AlertDialog } from "@/components/ui/AlertDialog";

export default function NewQuestionnairePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateQuestionnaireRequest>({
    title: "",
    description: "",
    number: 1,
    isActive: true,
    difficulty: undefined,
    timeLimit: undefined,
    passingScore: undefined,
  });

  // Alert dialog state
  const [alertDialog, setAlertDialog] = useState<{
    isOpen: boolean;
    type: "success" | "error" | "warning" | "info";
    title?: string;
    message: string;
  }>({
    isOpen: false,
    type: "info",
    message: "",
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateQuestionnaireRequest) => adminApi.createQuestionnaire(data),
    onSuccess: (response) => {
      router.push(`/admin/questionnaires/${response.data.id}/edit`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.number) {
      setAlertDialog({
        isOpen: true,
        type: "warning",
        title: "Missing Information",
        message: "Title and Number are required fields.",
      });
      return;
    }

    try {
      await createMutation.mutateAsync(formData);
    } catch (error: any) {
      setAlertDialog({
        isOpen: true,
        type: "error",
        title: "Error",
        message: error?.message || "Failed to create questionnaire. Please try again.",
      });
    }
  };

  const handleChange = (field: keyof CreateQuestionnaireRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="p-8 max-w-4xl">
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
          Create New Questionnaire
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Create a questionnaire template and add questions later
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              placeholder="e.g., CSE Professional 2025 - Set 1"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              rows={3}
              placeholder="Brief description of this questionnaire..."
            />
          </div>

          {/* Number and Status Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Questionnaire Number <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={formData.number}
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

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
              Difficulty Level (Optional)
            </label>
            <select
              value={formData.difficulty || ""}
              onChange={(e) => handleChange("difficulty", e.target.value || undefined)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
            >
              <option value="">Mixed Difficulty</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
          </div>

          {/* Time Limit and Passing Score Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Time Limit (minutes)
              </label>
              <input
                type="number"
                min="1"
                value={formData.timeLimit || ""}
                onChange={(e) => handleChange("timeLimit", e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="e.g., 120"
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
                onChange={(e) => handleChange("passingScore", e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="e.g., 75"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/questionnaires"
            className="px-6 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            {createMutation.isPending ? "Creating..." : "Create & Add Questions"}
          </button>
        </div>
      </form>
      </div>

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={alertDialog.isOpen}
        onClose={() => setAlertDialog({ ...alertDialog, isOpen: false })}
        type={alertDialog.type}
        title={alertDialog.title}
        message={alertDialog.message}
        confirmText="OK"
      />
    </>
  );
}
