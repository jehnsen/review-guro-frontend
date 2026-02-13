"use client";

import { useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  type?: ToastType;
  duration?: number;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-600",
    borderColor: "border-green-700",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-600",
    borderColor: "border-red-700",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-amber-600",
    borderColor: "border-amber-700",
  },
  info: {
    icon: Info,
    bgColor: "bg-blue-600",
    borderColor: "border-blue-700",
  },
};

export function Toast({
  isVisible,
  onClose,
  message,
  type = "info",
  duration = 3000,
}: ToastProps) {
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
      <div className={`${config.bgColor} text-white rounded-lg shadow-2xl border ${config.borderColor} min-w-[320px] max-w-md`}>
        <div className="flex items-start gap-3 p-4">
          <Icon size={20} className="flex-shrink-0 mt-0.5" />
          <p className="flex-1 text-sm font-medium leading-relaxed">{message}</p>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        {/* Progress bar */}
        {duration > 0 && (
          <div className="h-1 bg-white/20 rounded-b-lg overflow-hidden">
            <div
              className="h-full bg-white/50 animate-shrink"
              style={{ animationDuration: `${duration}ms` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
