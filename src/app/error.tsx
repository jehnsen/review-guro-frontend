"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button, Card } from "@/components/ui";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-400/10 dark:bg-rose-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/10 dark:bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        <Card className="p-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-rose-600 dark:text-rose-400" />
            </div>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Something went wrong
            </h1>

            <p className="text-slate-600 dark:text-slate-400 mb-6">
              We encountered an unexpected error. Don&apos;t worry, your progress
              has been saved.
            </p>

            {process.env.NODE_ENV === "development" && (
              <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-left">
                <p className="text-xs font-mono text-slate-600 dark:text-slate-400 break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-500 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={reset}
                fullWidth
                icon={RefreshCcw}
              >
                Try Again
              </Button>

              <Button
                onClick={() => (window.location.href = "/")}
                fullWidth
                variant="outline"
                icon={Home}
              >
                Go to Homepage
              </Button>
            </div>
          </div>
        </Card>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          If this problem persists, please contact support.
        </p>
      </div>
    </div>
  );
}
