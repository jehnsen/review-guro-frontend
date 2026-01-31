"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { Button, Card } from "@/components/ui";
import { authApi, setStoredUser } from "@/lib/api";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  useEffect(() => {
    // Verify payment and update user status
    const verifyPayment = async () => {
      try {
        // Fetch updated user profile to confirm premium activation
        const response = await authApi.getProfile();

        if (response.success && response.data) {
          // Update stored user data
          setStoredUser(response.data);
          setIsVerifying(false);

          // Start countdown after verification
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                router.push("/dashboard");
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          return () => clearInterval(timer);
        }
      } catch (error) {
        console.error("Failed to verify payment:", error);
        setVerificationError("Unable to verify payment status. Please refresh the page.");
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [router]);

  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  if (isVerifying) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto py-12">
          <Card className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-6">
              <Loader2 size={48} className="text-blue-600 dark:text-blue-400 animate-spin" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Verifying Payment...
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Please wait while we confirm your payment and activate your Season Pass.
            </p>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (verificationError) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto py-12">
          <Card className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={48} className="text-orange-600 dark:text-orange-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Verification Pending
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              {verificationError}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                Refresh Page
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleGoToDashboard}
              >
                Go to Dashboard
              </Button>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto py-12">
        <Card className="p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-emerald-600 dark:text-emerald-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Payment Successful!
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Thank you for your purchase. Your Season Pass has been activated.
          </p>

          {/* Redirect Info */}
          <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 mb-8">
            <Loader2 size={16} className="animate-spin" />
            <p className="text-sm">
              Redirecting to dashboard in {countdown} second{countdown !== 1 ? "s" : ""}...
            </p>
          </div>

          {/* Manual Button */}
          <Button
            size="lg"
            onClick={handleGoToDashboard}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
          >
            Go to Dashboard Now
          </Button>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              You now have full access to all premium features. Start exploring unlimited practice questions and mock exams!
            </p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
