"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Lock,
  Crown,
  Loader2,
  AlertCircle,
  CreditCard,
  Wallet,
  Check,
  CheckCircle,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { Button, Card } from "@/components/ui";
import { paymentApi } from "@/server/api";
import { useAuth } from "@/contexts/AuthContext";

const planDetails = {
  season_pass: {
    name: "Season Pass",
    description: "Full access to all premium features",
    monthlyPrice: 299,
    yearlyPrice: 2499,
    features: [
      "Unlimited practice questions",
      "All categories access",
      "Unlimited mock exams",
      "AI Tutor assistance",
      "Detailed explanations",
      "Performance analytics",
      "Ad-free experience",
    ],
  },
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { refreshUser } = useAuth();

  const plan = searchParams.get("plan") || "season_pass";
  const billing = (searchParams.get("billing") || "monthly") as "monthly" | "yearly";

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState("");

  const planInfo = planDetails[plan as keyof typeof planDetails];
  const price = billing === "monthly" ? planInfo?.monthlyPrice : planInfo?.yearlyPrice;

  const handlePayment = async () => {
    setError("");
    setIsProcessing(true);

    try {
      // Get current URL for success/cancel redirects
      const baseUrl = window.location.origin;

      const response = await paymentApi.createCheckout({
        successUrl: `${baseUrl}/checkout/success`,
        cancelUrl: `${baseUrl}/checkout/cancel`,
      });

      if (response.success && response.data?.checkoutUrl) {
        const referenceNumber = response.data.referenceNumber;

        // Open PayMongo in a new tab (Links API doesn't auto-redirect)
        window.open(response.data.checkoutUrl, '_blank');

        // Poll for payment completion
        const pollInterval = setInterval(async () => {
          try {
            // Check if user's premium status has been updated
            const profileResponse = await fetch('/api/auth/me', {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('reviewguro_token')}`,
              },
            });

            if (profileResponse.ok) {
              const profileData = await profileResponse.json();
              if (profileData.data?.isPremium) {
                // Payment successful! Stop polling
                clearInterval(pollInterval);
                setIsProcessing(false);
                setPaymentSuccess(true);

                // Update the global auth state so sidebar/other components update immediately
                await refreshUser();

                // Redirect to success page after a short delay
                setTimeout(() => {
                  router.push(`/checkout/success?ref=${encodeURIComponent(referenceNumber)}`);
                }, 2000);
              }
            }
          } catch (pollError) {
            console.error('Poll error:', pollError);
          }
        }, 3000); // Poll every 3 seconds

        // Stop polling after 10 minutes (user probably abandoned)
        setTimeout(() => {
          clearInterval(pollInterval);
          setIsProcessing(false);
        }, 600000);

      } else {
        setError(response.message || "Failed to create checkout session. Please try again.");
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("An error occurred while processing your payment. Please try again.");
      setIsProcessing(false);
    }
  };

  if (!planInfo) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Invalid Plan
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            The selected plan is not available.
          </p>
          <Link href="/pricing">
            <Button>View Plans</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  // Show success message when payment is detected
  if (paymentSuccess) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto py-12">
          <Card className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Payment Successful!
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
              Your Season Pass has been activated. You can now close the payment tab.
            </p>
            <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 mb-6">
              <Loader2 size={16} className="animate-spin" />
              <p className="text-sm">Redirecting to success page...</p>
            </div>
            <Button
              size="lg"
              onClick={() => router.push("/dashboard")}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
            >
              Go to Dashboard Now
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Plans
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Order Summary
            </h2>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
                <Crown size={28} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-lg text-slate-900 dark:text-white">
                  {planInfo.name}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {billing === "monthly" ? "Monthly" : "Yearly"} subscription
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2 mb-6">
              {planInfo.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Check size={16} className="text-emerald-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                <span className="text-slate-900 dark:text-white">
                  ₱{price?.toLocaleString()}
                </span>
              </div>
              {billing === "yearly" && (
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Yearly Discount
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    -₱{((planInfo.monthlyPrice * 12) - planInfo.yearlyPrice).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-between py-4 border-t border-slate-200 dark:border-slate-700 mt-3">
              <span className="font-semibold text-slate-900 dark:text-white">Total</span>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  ₱{price?.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {billing === "monthly" ? "per month" : "per year"}
                </p>
              </div>
            </div>
          </Card>

          {/* Payment Section */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Payment
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                A new tab will open with PayMongo&apos;s secure checkout. Complete your payment there, and this page will automatically update.
              </p>

              {/* Supported Payment Methods */}
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 mb-6">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                  SUPPORTED PAYMENT METHODS
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <CreditCard size={16} className="text-slate-600 dark:text-slate-400" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Credit/Debit Card</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <Wallet size={16} className="text-blue-500" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">GCash</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <Wallet size={16} className="text-green-500" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Maya</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <Wallet size={16} className="text-emerald-500" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">GrabPay</span>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 flex items-start gap-3">
                  <AlertCircle size={20} className="text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-rose-700 dark:text-rose-300">{error}</p>
                </div>
              )}

              <Button
                fullWidth
                size="lg"
                onClick={handlePayment}
                isLoading={isProcessing}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                {isProcessing ? "Waiting for payment..." : `Pay ₱${price?.toLocaleString()}`}
              </Button>

              {isProcessing && (
                <p className="text-xs text-blue-600 dark:text-blue-400 text-center mt-2">
                  Complete your payment in the new tab. This page will redirect automatically when done.
                </p>
              )}

              <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy.
              </p>
            </Card>

            {/* Security Badges */}
            <div className="flex items-center justify-center gap-6 text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2 text-sm">
                <Lock size={16} />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield size={16} />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </DashboardLayout>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
