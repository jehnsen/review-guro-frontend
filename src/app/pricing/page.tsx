"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Crown,
  Zap,
  Shield,
  Clock,
  BookOpen,
  Brain,
  Target,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { Button, Card, Badge } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";

type BillingPeriod = "monthly" | "yearly";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PlanFeature[];
  popular?: boolean;
  icon: React.ElementType;
  color: string;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Basic access to start your review journey",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: BookOpen,
    color: "slate",
    features: [
      { text: "50 practice questions per day", included: true },
      { text: "Basic progress tracking", included: true },
      { text: "5 categories access", included: true },
      { text: "Limited mock exams (1/week)", included: true },
      { text: "AI Tutor assistance", included: false },
      { text: "Detailed explanations", included: false },
      { text: "Performance analytics", included: false },
      { text: "Ad-free experience", included: false },
    ],
  },
  {
    id: "season_pass",
    name: "Season Pass",
    description: "Full access for your exam preparation",
    monthlyPrice: 299,
    yearlyPrice: 2499,
    icon: Crown,
    color: "amber",
    popular: true,
    features: [
      { text: "Unlimited practice questions", included: true },
      { text: "Advanced progress tracking", included: true },
      { text: "All categories access", included: true },
      { text: "Unlimited mock exams", included: true },
      { text: "AI Tutor assistance", included: true },
      { text: "Detailed explanations", included: true },
      { text: "Performance analytics", included: true },
      { text: "Ad-free experience", included: true },
    ],
  },
];

export default function PricingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  const handleSelectPlan = (planId: string) => {
    if (planId === "free") {
      router.push("/dashboard");
      return;
    }

    // Navigate to checkout with plan details
    router.push(`/checkout?plan=${planId}&billing=${billingPeriod}`);
  };

  const getPrice = (plan: Plan) => {
    return billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan: Plan) => {
    if (plan.monthlyPrice === 0) return 0;
    const yearlyIfMonthly = plan.monthlyPrice * 12;
    return yearlyIfMonthly - plan.yearlyPrice;
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="primary" className="mb-4">
            <Sparkles size={14} className="mr-1" />
            Upgrade Your Learning
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Unlock your full potential with our Season Pass. Get unlimited access to all features and maximize your chances of passing the Civil Service Exam.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              billingPeriod === "monthly"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod("yearly")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              billingPeriod === "yearly"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            Yearly
            <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">
              Save 30%
            </span>
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = getPrice(plan);
            const savings = getSavings(plan);
            const isPremium = plan.id === "season_pass";
            const isCurrentPlan = !user?.isPremium && plan.id === "free";

            return (
              <Card
                key={plan.id}
                className={`relative p-6 lg:p-8 ${
                  plan.popular
                    ? "border-2 border-amber-500 dark:border-amber-400"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="warning" className="shadow-lg">
                      <Star size={12} className="mr-1 fill-current" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isPremium
                        ? "bg-gradient-to-br from-amber-400 to-amber-600"
                        : "bg-slate-100 dark:bg-slate-800"
                    }`}
                  >
                    <Icon
                      size={24}
                      className={isPremium ? "text-white" : "text-slate-600 dark:text-slate-400"}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {plan.description}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                      {price === 0 ? "Free" : `₱${price.toLocaleString()}`}
                    </span>
                    {price > 0 && (
                      <span className="text-slate-500 dark:text-slate-400">
                        /{billingPeriod === "monthly" ? "month" : "year"}
                      </span>
                    )}
                  </div>
                  {billingPeriod === "yearly" && savings > 0 && (
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                      Save ₱{savings.toLocaleString()} per year
                    </p>
                  )}
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 ${
                        feature.included
                          ? "text-slate-700 dark:text-slate-300"
                          : "text-slate-400 dark:text-slate-600"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          feature.included
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                            : "bg-slate-100 dark:bg-slate-800"
                        }`}
                      >
                        {feature.included && <Check size={12} />}
                      </div>
                      <span className={feature.included ? "" : "line-through"}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  fullWidth
                  variant={isPremium ? "primary" : "outline"}
                  size="lg"
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isCurrentPlan}
                  icon={isPremium ? ArrowRight : undefined}
                  iconPosition="right"
                  className={isPremium ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700" : ""}
                >
                  {isCurrentPlan
                    ? "Current Plan"
                    : isPremium
                      ? "Get Season Pass"
                      : "Continue Free"}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <Card className="p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Why Upgrade to Season Pass?
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Unlimited Practice",
                description: "No daily limits on questions",
              },
              {
                icon: Brain,
                title: "AI Tutor",
                description: "24/7 personalized assistance",
              },
              {
                icon: Target,
                title: "Mock Exams",
                description: "Simulate real exam conditions",
              },
              {
                icon: Shield,
                title: "Pass Guarantee",
                description: "92% of users pass their exam",
              },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto mb-3">
                    <Icon size={24} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* FAQ or Trust badges */}
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>Secure payment processing powered by PayMongo</p>
          <p className="mt-1">Cancel anytime. No hidden fees.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
