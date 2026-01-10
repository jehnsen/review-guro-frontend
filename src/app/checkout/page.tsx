"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CreditCard,
  Wallet,
  ArrowLeft,
  Shield,
  Lock,
  Check,
  Crown,
  Loader2,
  Smartphone,
  Building,
  AlertCircle,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { Button, Card, Badge, Input } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";
import { paymentApi, CreatePaymentIntentRequest } from "@/lib/api";

type PaymentMethod = "card" | "gcash" | "maya" | "grab_pay";

interface PaymentMethodOption {
  id: PaymentMethod;
  name: string;
  icon: React.ElementType;
  description: string;
  type: "card" | "ewallet";
}

const paymentMethods: PaymentMethodOption[] = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, JCB",
    type: "card",
  },
  {
    id: "gcash",
    name: "GCash",
    icon: Wallet,
    description: "Pay with your GCash wallet",
    type: "ewallet",
  },
  {
    id: "maya",
    name: "Maya",
    icon: Smartphone,
    description: "Pay with Maya (PayMaya)",
    type: "ewallet",
  },
  {
    id: "grab_pay",
    name: "GrabPay",
    icon: Wallet,
    description: "Pay with GrabPay wallet",
    type: "ewallet",
  },
];

const planDetails = {
  season_pass: {
    name: "Season Pass",
    description: "Full access to all premium features",
    monthlyPrice: 299,
    yearlyPrice: 2499,
  },
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const plan = searchParams.get("plan") || "season_pass";
  const billing = (searchParams.get("billing") || "monthly") as "monthly" | "yearly";

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("gcash");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  // Card form state
  const [cardForm, setCardForm] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const planInfo = planDetails[plan as keyof typeof planDetails];
  const price = billing === "monthly" ? planInfo?.monthlyPrice : planInfo?.yearlyPrice;

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleCardChange = (field: string, value: string) => {
    let formattedValue = value;

    if (field === "number") {
      formattedValue = formatCardNumber(value);
    } else if (field === "expiry") {
      formattedValue = formatExpiry(value.replace("/", ""));
    } else if (field === "cvc") {
      formattedValue = value.replace(/[^0-9]/g, "").substring(0, 4);
    }

    setCardForm((prev) => ({ ...prev, [field]: formattedValue }));
  };

  const handlePayment = async () => {
    setError("");
    setIsProcessing(true);

    try {
      // Prepare payment request based on selected method
      const paymentRequest: CreatePaymentIntentRequest = {
        amount: price || 0,
        currency: "PHP",
        paymentMethod: selectedMethod,
        description: `ReviewGuro ${planInfo?.name} - ${billing === "monthly" ? "Monthly" : "Yearly"} Subscription`,
        metadata: {
          planId: plan,
          billingPeriod: billing,
          userId: user?.id || "",
        },
      };

      // If card payment, add card details
      if (selectedMethod === "card") {
        const [expMonth, expYear] = cardForm.expiry.split("/");
        paymentRequest.cardDetails = {
          cardNumber: cardForm.number.replace(/\s/g, ""),
          expMonth: parseInt(expMonth, 10),
          expYear: parseInt("20" + expYear, 10),
          cvc: cardForm.cvc,
          cardholderName: cardForm.name,
        };
      }

      // Create payment intent via API
      const response = await paymentApi.createPaymentIntent(paymentRequest);

      if (response.success && response.data) {
        // For e-wallets, redirect to the checkout URL
        if (response.data.checkoutUrl) {
          window.location.href = response.data.checkoutUrl;
        } else if (response.data.status === "succeeded") {
          // For card payments that succeed immediately
          router.push("/checkout/success?payment_id=" + response.data.paymentIntentId);
        } else {
          // Handle pending or other states
          router.push("/checkout/pending?payment_id=" + response.data.paymentIntentId);
        }
      } else {
        setError(response.message || "Payment failed. Please try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("An error occurred while processing your payment. Please try again.");
    } finally {
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

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Plans
        </Link>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Payment Method
              </h2>

              {/* Payment Method Selection */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = selectedMethod === method.id;

                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isSelected
                              ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          <Icon size={20} />
                        </div>
                        <div>
                          <p
                            className={`font-medium ${
                              isSelected
                                ? "text-blue-700 dark:text-blue-300"
                                : "text-slate-900 dark:text-white"
                            }`}
                          >
                            {method.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Card Form (only shown when card is selected) */}
              {selectedMethod === "card" && (
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Cardholder Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Name on card"
                      value={cardForm.name}
                      onChange={(e) => handleCardChange("name", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Card Number
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardForm.number}
                        onChange={(e) => handleCardChange("number", e.target.value)}
                        maxLength={19}
                        className="pl-10"
                      />
                      <CreditCard
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Expiry Date
                      </label>
                      <Input
                        type="text"
                        placeholder="MM/YY"
                        value={cardForm.expiry}
                        onChange={(e) => handleCardChange("expiry", e.target.value)}
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        CVC
                      </label>
                      <Input
                        type="text"
                        placeholder="123"
                        value={cardForm.cvc}
                        onChange={(e) => handleCardChange("cvc", e.target.value)}
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* E-Wallet Info */}
              {selectedMethod !== "card" && (
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    You will be redirected to {paymentMethods.find((m) => m.id === selectedMethod)?.name} to complete your payment securely.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-4 rounded-lg bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 flex items-start gap-3">
                  <AlertCircle size={20} className="text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-rose-700 dark:text-rose-300">{error}</p>
                </div>
              )}
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

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="p-6 sticky top-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Order Summary
              </h3>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                  <Crown size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {planInfo.name}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {billing === "monthly" ? "Monthly" : "Yearly"} subscription
                  </p>
                </div>
              </div>

              <div className="space-y-3 pb-4 border-b border-slate-200 dark:border-slate-700">
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

              <div className="flex justify-between py-4">
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

              <Button
                fullWidth
                size="lg"
                onClick={handlePayment}
                isLoading={isProcessing}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              >
                {isProcessing ? "Processing..." : `Pay ₱${price?.toLocaleString()}`}
              </Button>

              <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-4">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy.
              </p>
            </Card>
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
