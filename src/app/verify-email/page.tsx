"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { api } from "@/server/api";

type VerificationState = "loading" | "success" | "error" | "expired";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [state, setState] = useState<VerificationState>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setState("error");
        setErrorMessage("No verification token provided.");
        return;
      }

      try {
        await api.post("/api/auth/verify-email", { token });
        setState("success");

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } catch (error) {
        setState("error");
        if (error instanceof Error) {
          if (error.message.includes("expired")) {
            setState("expired");
            setErrorMessage(
              "This verification link has expired. Please request a new one."
            );
          } else if (error.message.includes("already verified")) {
            setState("success");
          } else {
            setErrorMessage(
              error.message || "Failed to verify email. Please try again."
            );
          }
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      }
    };

    verifyEmail();
  }, [token, router]);

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
          {state === "loading" && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Verifying your email...
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Please wait while we verify your email address.
              </p>
            </div>
          )}

          {state === "success" && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Email verified!
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Your email has been successfully verified. You will be
                redirected to the dashboard shortly.
              </p>
              <Button onClick={() => router.push("/dashboard")} fullWidth>
                Go to Dashboard
              </Button>
            </div>
          )}

          {(state === "error" || state === "expired") && (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-8 h-8 text-rose-600 dark:text-rose-400" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {state === "expired"
                  ? "Link expired"
                  : "Verification failed"}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {errorMessage}
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => router.push("/sign-in")}
                  fullWidth
                  variant="outline"
                >
                  Sign in to resend
                </Button>
                <Link
                  href="/"
                  className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Go to homepage
                </Link>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function VerifyEmailLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailLoading />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
