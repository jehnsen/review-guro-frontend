"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { Button } from "./Button";

export type AlertType = "success" | "error" | "warning" | "info";

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: AlertType;
  confirmText?: string;
  onConfirm?: () => void;
  cancelText?: string;
  showCancel?: boolean;
}

const alertConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400",
    borderColor: "border-green-200 dark:border-green-800",
    buttonColor: "bg-green-600 hover:bg-green-700",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-50 dark:bg-red-900/20",
    iconColor: "text-red-600 dark:text-red-400",
    borderColor: "border-red-200 dark:border-red-800",
    buttonColor: "bg-red-600 hover:bg-red-700",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    iconColor: "text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-200 dark:border-amber-800",
    buttonColor: "bg-amber-600 hover:bg-amber-700",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-200 dark:border-blue-800",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
  },
};

export function AlertDialog({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  confirmText = "OK",
  onConfirm,
  cancelText = "Cancel",
  showCancel = false,
}: AlertDialogProps) {
  const config = alertConfig[type];
  const Icon = config.icon;

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Icon */}
          <div className={`w-16 h-16 rounded-full ${config.bgColor} flex items-center justify-center mb-4`}>
            <Icon className={config.iconColor} size={32} />
          </div>

          {/* Title */}
          {title && (
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {title}
            </h2>
          )}

          {/* Message */}
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
            {message}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            {showCancel && (
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                {cancelText}
              </Button>
            )}
            <button
              onClick={handleConfirm}
              className={`flex-1 px-6 py-3 ${config.buttonColor} text-white rounded-lg font-medium transition-all transform active:scale-95 shadow-lg hover:shadow-xl`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook for easier usage
export function useAlertDialog() {
  const [state, setState] = useState<{
    isOpen: boolean;
    title?: string;
    message: string;
    type: AlertType;
    onConfirm?: () => void;
    showCancel?: boolean;
  }>({
    isOpen: false,
    message: "",
    type: "info",
  });

  const showAlert = (
    message: string,
    options?: {
      title?: string;
      type?: AlertType;
      onConfirm?: () => void;
      showCancel?: boolean;
    }
  ) => {
    setState({
      isOpen: true,
      message,
      type: options?.type || "info",
      title: options?.title,
      onConfirm: options?.onConfirm,
      showCancel: options?.showCancel,
    });
  };

  const closeAlert = () => {
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    alertProps: {
      ...state,
      onClose: closeAlert,
    },
    showAlert,
    closeAlert,
  };
}

// Separate useState import
import { useState } from "react";
