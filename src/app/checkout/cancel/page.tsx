"use client";

import { useRouter } from "next/navigation";
import { XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout";
import { Button, Card } from "@/components/ui";

export default function CheckoutCancelPage() {
  const router = useRouter();

  const handleRetry = () => {
    router.push("/pricing");
  };

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto py-12">
        <Card className="p-8 text-center">
          {/* Cancel Icon */}
          <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-6">
            <XCircle size={48} className="text-orange-600 dark:text-orange-400" />
          </div>

          {/* Cancel Message */}
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Payment Cancelled
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Your payment was cancelled. No charges were made to your account.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              onClick={handleRetry}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
            >
              Try Again
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleGoToDashboard}
            >
              Go to Dashboard
            </Button>
          </div>

          {/* Help Link */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Having trouble with payment? We&apos;re here to help.
            </p>
            <Link
              href="/support"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              Contact Support
            </Link>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
