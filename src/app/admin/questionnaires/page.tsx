"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Target
} from "lucide-react";
import { adminApi, QuestionnaireResponse } from "@/server/api";
import { AlertDialog } from "@/components/ui/AlertDialog";

export default function AdminQuestionnairesPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState<boolean | undefined>(undefined);
  const limit = 20;

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

  const [questionnaireToDelete, setQuestionnaireToDelete] = useState<QuestionnaireResponse | null>(null);

  // Fetch questionnaires
  const { data, isLoading } = useQuery({
    queryKey: ["admin-questionnaires", page, search, isActiveFilter],
    queryFn: () =>
      adminApi.listQuestionnaires({
        page,
        limit,
        search: search || undefined,
        isActive: isActiveFilter,
      }),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteQuestionnaire(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-questionnaires"] });
    },
  });

  const handleDelete = (questionnaire: QuestionnaireResponse) => {
    setQuestionnaireToDelete(questionnaire);
    setAlertDialog({
      isOpen: true,
      type: "warning",
      title: "Delete Questionnaire?",
      message: `Are you sure you want to delete "${questionnaire.title}"? This will remove all question assignments.`,
      showCancel: true,
      onConfirm: confirmDelete,
    });
  };

  const confirmDelete = async () => {
    if (!questionnaireToDelete) return;

    try {
      await deleteMutation.mutateAsync(questionnaireToDelete.id);
      setQuestionnaireToDelete(null);
      setAlertDialog({
        isOpen: true,
        type: "success",
        title: "Deleted!",
        message: "Questionnaire deleted successfully!",
      });
    } catch (error) {
      setAlertDialog({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Failed to delete questionnaire. Please try again.",
      });
    }
  };

  const questionnaires = data?.data || [];
  const meta = data?.meta;

  return (
    <>
      <div className="p-8">
        {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Questionnaires
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage questionnaire templates and their questions
          </p>
        </div>
        <Link
          href="/admin/questionnaires/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Create Questionnaire
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-6 flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
          />
        </div>

        <select
          value={isActiveFilter === undefined ? "all" : isActiveFilter.toString()}
          onChange={(e) => {
            const value = e.target.value;
            setIsActiveFilter(value === "all" ? undefined : value === "true");
            setPage(1);
          }}
          className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {/* Questionnaires List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : questionnaires.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-12 text-center">
          <FileText className="mx-auto text-slate-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
            No questionnaires found
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Create your first questionnaire template to get started
          </p>
          <Link
            href="/admin/questionnaires/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Create Questionnaire
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Questions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {questionnaires.map((questionnaire) => (
                  <tr
                    key={questionnaire.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        #{questionnaire.number}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                        {questionnaire.title}
                      </div>
                      {questionnaire.description && (
                        <div className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-md">
                          {questionnaire.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900 dark:text-white">
                        {questionnaire.totalQuestions} questions
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs text-slate-600 dark:text-slate-400">
                        {questionnaire.difficulty && (
                          <div className="flex items-center gap-1">
                            <Target size={12} />
                            {questionnaire.difficulty}
                          </div>
                        )}
                        {questionnaire.timeLimit && (
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            {questionnaire.timeLimit} min
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {questionnaire.isActive ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle size={12} />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-400">
                          <XCircle size={12} />
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/questionnaires/${questionnaire.id}`}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          href={`/admin/questionnaires/${questionnaire.id}/edit`}
                          className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(questionnaire)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete"
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, meta.total)} of {meta.total} questionnaires
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Previous
                </button>
                <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg font-medium">
                  Page {page} of {meta.totalPages}
                </div>
                <button
                  onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                  disabled={page === meta.totalPages}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
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
