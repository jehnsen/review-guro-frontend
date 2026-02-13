"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { adminApi, AdminQuestionFilters, QuestionWithAnswer } from "@/server/api";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { QuestionTable } from "@/components/admin/QuestionTable";
import { QuestionFilters } from "@/components/admin/QuestionFilters";
import { AlertDialog } from "@/components/ui/AlertDialog";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

export default function AdminQuestionsPage() {
  const router = useRouter();

  // State
  const [questions, setQuestions] = useState<QuestionWithAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<AdminQuestionFilters>({
    page: 1,
    limit: 20,
  });
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

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

  // Confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    questionId: string | null;
  }>({
    isOpen: false,
    questionId: null,
  });

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch questions
  const fetchQuestions = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await adminApi.listQuestions({
        ...filters,
        search: debouncedSearch || undefined,
      });

      setQuestions(response.data);
      setTotal(response.meta.total);
      setTotalPages(response.meta.totalPages);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters, debouncedSearch]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // Handle delete
  const handleDelete = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      questionId: id,
    });
  };

  const confirmDelete = async () => {
    const { questionId } = confirmDialog;
    if (!questionId) return;

    try {
      await adminApi.deleteQuestion(questionId);

      // Close confirm dialog
      setConfirmDialog({ isOpen: false, questionId: null });

      // Refresh list
      await fetchQuestions();

      // Show success alert
      setAlertDialog({
        isOpen: true,
        type: "success",
        title: "Success!",
        message: "Question deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete question:", error);

      // Close confirm dialog
      setConfirmDialog({ isOpen: false, questionId: null });

      // Show error alert
      setAlertDialog({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Failed to delete question. Please try again.",
      });
    }
  };

  // Handle filter change
  const handleFilterChange = (newFilters: AdminQuestionFilters) => {
    setFilters({
      ...newFilters,
      page: 1, // Reset to first page when filters change
      limit: filters.limit,
    });
  };

  // Clear filters
  const handleClearFilters = () => {
    setFilters({ page: 1, limit: 20 });
    setSearchQuery("");
  };

  // Pagination
  const handlePrevPage = () => {
    if (filters.page && filters.page > 1) {
      setFilters({ ...filters, page: filters.page - 1 });
    }
  };

  const handleNextPage = () => {
    if (filters.page && filters.page < totalPages) {
      setFilters({ ...filters, page: filters.page + 1 });
    }
  };

  return (
    <>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Question Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage exam questions and practice materials
          </p>
        </div>
        <Link href="/admin/questions/new">
          <Button variant="primary">
            <Plus size={18} className="mr-2" />
            Create Question
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
              {total}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Current Page</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-700 dark:text-slate-300">
              {filters.page || 1} / {totalPages || 1}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Per Page</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-700 dark:text-slate-300">
              {filters.limit || 20}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Filtered</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-700 dark:text-slate-300">
              {questions.length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filters */}
      <QuestionFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Questions Table */}
      <QuestionTable
        questions={questions}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing {questions.length} of {total} questions
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePrevPage}
              disabled={!filters.page || filters.page <= 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={handleNextPage}
              disabled={!filters.page || filters.page >= totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      </div>

      {/* Confirm Delete Dialog */}
      <AlertDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, questionId: null })}
        type="warning"
        title="Delete Question?"
        message="Are you sure you want to delete this question? This action cannot be undone and will remove all associated progress data."
        confirmText="Delete"
        cancelText="Cancel"
        showCancel={true}
        onConfirm={confirmDelete}
      />

      {/* Success/Error Alert Dialog */}
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
