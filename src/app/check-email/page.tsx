"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, RefreshCw, ArrowRight } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/server/api";

export default function CheckEmailPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleResendEmail = async () => {
    setIsResending(true);
    setError("");
    setResendSuccess(false);

    try {
      await api.post("/api/auth/resend-verification");
      setResendSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to resend verification email. Please try again.");
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">
            Review<span className="text-blue-600 dark:text-blue-500">Guro</span>
          </span>
        </Link>

        <Card className="p-8">
          <div className="text-center">
            {/* Email icon */}
            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Check your email
            </h1>

            <p className="text-slate-600 dark:text-slate-400 mb-2">
              We sent a verification link to
            </p>

            {user?.email && (
              <p className="font-medium text-slate-900 dark:text-white mb-6">
                {user.email}
              </p>
            )}

            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Click the link in your email to verify your account. If you don't
              see it, check your spam folder.
            </p>

            {error && (
              <div className="p-3 mb-4 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
                <p className="text-sm text-rose-600 dark:text-rose-400">
                  {error}
                </p>
              </div>
            )}

            {resendSuccess && (
              <div className="p-3 mb-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Verification email sent! Please check your inbox.
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={handleResendEmail}
                variant="outline"
                fullWidth
                isLoading={isResending}
                className="gap-2"
              >
                <RefreshCw size={16} />
                Resend verification email
              </Button>

              <Button
                onClick={() => router.push("/dashboard")}
                fullWidth
                className="gap-2"
              >
                Continue to Dashboard
                <ArrowRight size={16} />
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Already verified?{" "}
                <Link
                  href="/sign-in"
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </Card>

        {/* Help text */}
        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          The verification link will expire in 24 hours.
        </p>
      </div>
    </div>
  );
}
