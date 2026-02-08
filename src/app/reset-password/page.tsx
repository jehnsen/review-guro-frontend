"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button, Input, Card } from "@/components/ui";
import { GuestGuard } from "@/contexts/AuthContext";
import { api, ApiError } from "@/server/api";

type ResetState = "form" | "loading" | "success" | "error";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [state, setState] = useState<ResetState>(token ? "form" : "error");
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(pwd)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(pwd)) {
      return "Password must contain at least one number";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    const validationError = validatePassword(password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      await api.post("/api/auth/reset-password", { token, password });
      setState("success");

      // Redirect to sign-in after 3 seconds
      setTimeout(() => {
        router.push("/sign-in");
      }, 3000);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.message.includes("expired")) {
          setState("error");
          setError("This reset link has expired. Please request a new one.");
        } else if (err.message.includes("Invalid")) {
          setState("error");
          setError("This reset link is invalid. Please request a new one.");
        } else {
          setError(err.message || "An error occurred. Please try again.");
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-rose-600 dark:text-rose-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Invalid reset link
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          No reset token was provided. Please request a new password reset link.
        </p>
        <Button onClick={() => router.push("/forgot-password")} fullWidth>
          Request New Link
        </Button>
      </div>
    );
  }

  return (
    <>
      {state === "form" && (
        <>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Reset your password
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Enter your new password below.
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
                New Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                At least 8 characters with uppercase, lowercase, and number
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
              className="mt-6"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </>
      )}

      {state === "success" && (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Password reset successful!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Your password has been reset. You will be redirected to sign in
            shortly.
          </p>
          <Button onClick={() => router.push("/sign-in")} fullWidth>
            Sign In Now
          </Button>
        </div>
      )}

      {state === "error" && (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-rose-600 dark:text-rose-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Reset link expired
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
          <Button onClick={() => router.push("/forgot-password")} fullWidth>
            Request New Link
          </Button>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          href="/sign-in"
          className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    </>
  );
}

function ResetPasswordLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
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
          <Link
            href="/"
            className="flex items-center justify-center gap-2 mb-8"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              Review
              <span className="text-blue-600 dark:text-blue-500">Guro</span>
            </span>
          </Link>

          <Card className="p-8">
            <Suspense fallback={<ResetPasswordLoading />}>
              <ResetPasswordContent />
            </Suspense>
          </Card>
        </div>
      </div>
    </GuestGuard>
  );
}
