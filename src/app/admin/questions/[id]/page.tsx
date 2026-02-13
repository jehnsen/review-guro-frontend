"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { adminApi, CreateQuestionRequest, QuestionWithAnswer } from "@/server/api";
import { QuestionForm } from "@/components/admin/QuestionForm";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AlertDialog } from "@/components/ui/AlertDialog";
import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

export default function EditQuestionPage() {
  const router = useRouter();
  const params = useParams();
  const questionId = params.id as string;

  const [question, setQuestion] = useState<QuestionWithAnswer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  // Fetch question
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await adminApi.getQuestion(questionId);
        setQuestion(response.data);
      } catch (error) {
        console.error("Failed to fetch question:", error);
        setAlertDialog({
          isOpen: true,
          type: "error",
          title: "Error",
          message: "Failed to load question. Redirecting to questions list.",
          onConfirm: () => router.push("/admin/questions"),
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId, router]);

  const handleSubmit = async (data: CreateQuestionRequest) => {
    try {
      setIsSubmitting(true);

      await adminApi.updateQuestion(questionId, data);

      setAlertDialog({
        isOpen: true,
        type: "success",
        title: "Success!",
        message: "Question updated successfully!",
        onConfirm: () => router.push("/admin/questions"),
      });
    } catch (error) {
      console.error("Failed to update question:", error);
      setAlertDialog({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Failed to update question. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setAlertDialog({
      isOpen: true,
      type: "warning",
      title: "Discard Changes?",
      message: "Are you sure you want to cancel? All unsaved changes will be lost.",
      showCancel: true,
      onConfirm: () => router.push("/admin/questions"),
    });
  };

  const handleDelete = () => {
    setAlertDialog({
      isOpen: true,
      type: "warning",
      title: "Delete Question?",
      message: "Are you sure you want to delete this question? This action cannot be undone and will remove all user progress.",
      showCancel: true,
      onConfirm: confirmDelete,
    });
  };

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);

      await adminApi.deleteQuestion(questionId);

      setAlertDialog({
        isOpen: true,
        type: "success",
        title: "Deleted!",
        message: "Question deleted successfully!",
        onConfirm: () => router.push("/admin/questions"),
      });
    } catch (error) {
      console.error("Failed to delete question:", error);
      setAlertDialog({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Failed to delete question. Please try again.",
      });
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (!question) {
    return null;
  }

  return (
    <>
      <div>
        {/* Header */}
      <div className="mb-6">
        <Link href="/admin/questions">
          <Button variant="ghost" size="sm" className="mb-3">
            <ArrowLeft size={16} className="mr-2" />
            Back to Questions
          </Button>
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Edit Question
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Update question details and settings
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="info" className="text-xs">
                ID: {questionId}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 mb-6">
        <QuestionForm
          initialData={question}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
        />
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900 rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
              Danger Zone
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Once you delete this question, there is no going back. This will also remove all user progress related to this question.
            </p>
          </div>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 size={16} className="mr-2" />
            {isDeleting ? "Deleting..." : "Delete Question"}
          </Button>
        </div>
      </div>
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
