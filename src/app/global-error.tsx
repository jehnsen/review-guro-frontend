"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Global Error Boundary
 * This catches errors in the root layout and renders a full-page error UI
 * It must include its own <html> and <body> tags since the layout may have errored
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50/30 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-rose-600" />
              </div>

              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                Critical Error
              </h1>

              <p className="text-slate-600 mb-6">
                We encountered a critical error that prevented the page from
                loading. Please try refreshing the page.
              </p>

              {process.env.NODE_ENV === "development" && (
                <div className="mb-6 p-4 bg-slate-100 rounded-lg text-left">
                  <p className="text-xs font-mono text-slate-600 break-all">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-xs font-mono text-slate-500 mt-2">
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={reset}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Try Again
                </button>

                <button
                  onClick={() => (window.location.href = "/")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-slate-700 rounded-lg font-medium border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Go to Homepage
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            If this problem persists, please contact support.
          </p>
        </div>
      </body>
    </html>
  );
}
