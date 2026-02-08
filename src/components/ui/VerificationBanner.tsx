"use client";

import { useState, useEffect } from "react";
import { Mail, X, RefreshCw } from "lucide-react";
import { api } from "@/server/api";

interface VerificationBannerProps {
  email?: string;
  onDismiss?: () => void;
}

const DISMISS_KEY = "verification_banner_dismissed";

export function VerificationBanner({ email, onDismiss }: VerificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if banner was previously dismissed (within last 24 hours)
    const dismissedAt = localStorage.getItem(DISMISS_KEY);
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10);
      const hoursSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60);
      if (hoursSinceDismissed < 24) {
        setIsVisible(false);
      } else {
        localStorage.removeItem(DISMISS_KEY);
      }
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setIsVisible(false);
    onDismiss?.();
  };

  const handleResend = async () => {
    setIsResending(true);
    setError("");
    setResendSuccess(false);

    try {
      await api.post("/api/auth/resend-verification");
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 5000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to resend email");
      }
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsResending(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
              <Mail size={16} className="text-amber-600 dark:text-amber-400" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Please verify your email address
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-400 truncate">
                {email
                  ? `We sent a verification link to ${email}`
                  : "Check your inbox for the verification link"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {resendSuccess && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400">
                Email sent!
              </span>
            )}
            {error && (
              <span className="text-xs text-rose-600 dark:text-rose-400">
                {error}
              </span>
            )}
            <button
              onClick={handleResend}
              disabled={isResending}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/50 hover:bg-amber-200 dark:hover:bg-amber-900/70 rounded-md transition-colors disabled:opacity-50"
            >
              <RefreshCw
                size={12}
                className={isResending ? "animate-spin" : ""}
              />
              {isResending ? "Sending..." : "Resend"}
            </button>
            <button
              onClick={handleDismiss}
              className="p-1.5 text-amber-500 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-200 rounded-md hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
