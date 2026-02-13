"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi, CreateQuestionRequest } from "@/server/api";
import { QuestionForm } from "@/components/admin/QuestionForm";
import { Button } from "@/components/ui/Button";
import { AlertDialog } from "@/components/ui/AlertDialog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewQuestionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (data: CreateQuestionRequest) => {
    try {
      setIsSubmitting(true);

      await adminApi.createQuestion(data);

      setAlertDialog({
        isOpen: true,
        type: "success",
        title: "Success!",
        message: "Question created successfully!",
        onConfirm: () => router.push("/admin/questions"),
      });
    } catch (error) {
      console.error("Failed to create question:", error);
      setAlertDialog({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Failed to create question. Please try again.",
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
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Create New Question
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Add a new question to the question bank
        </p>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
        <QuestionForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
        />
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
