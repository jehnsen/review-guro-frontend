"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button, Input, Card } from "@/components/ui";
import { GuestGuard } from "@/contexts/AuthContext";
import { api, ApiError } from "@/server/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await api.post("/api/auth/forgot-password", { email });
      setIsSuccess(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message || "An error occurred. Please try again.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GuestGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl" />
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
            {!isSuccess ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Forgot your password?
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    Enter your email address and we&apos;ll send you a link to reset
                    your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800">
                      <p className="text-sm text-rose-600 dark:text-rose-400">
                        {error}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    isLoading={isLoading}
                    className="mt-6"
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Check your email
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  If an account exists for <strong>{email}</strong>, we&apos;ve
                  sent a password reset link. Please check your inbox and spam
                  folder.
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  The link will expire in 1 hour.
                </p>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                <ArrowLeft size={16} />
                Back to sign in
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </GuestGuard>
  );
}
