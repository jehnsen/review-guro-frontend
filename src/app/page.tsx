"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Brain,
  Shield,
  Smartphone,
  Check,
  ArrowRight,
  Star,
  Users,
  Trophy,
  Clock,
  BookOpen,
  Target,
  Zap,
  ChevronRight,
  GraduationCap,
  Calculator,
  FileText,
  Award,
  Sparkles,
  CheckCircle,
  Lightbulb,
  PenTool,
  ShieldCheck,
  Repeat,
} from "lucide-react";
import { PublicLayout } from "@/components/layout";
import { Button, Card, Badge } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";

// Scroll Animation Hook
function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// Animated Section Wrapper
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Staggered Children Animation
function StaggeredContainer({
  children,
  className = "",
  staggerDelay = 100,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className="transition-all duration-500 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${index * staggerDelay}ms`,
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}

// Floating Icon Component
function FloatingIcon({
  icon: Icon,
  className,
  size = 24,
  delay = 0,
}: {
  icon: typeof Brain;
  className: string;
  size?: number;
  delay?: number;
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700">
        <Icon size={size} className="text-blue-600 dark:text-blue-400" />
      </div>
    </div>
  );
}

// Animated Background Shapes
function BackgroundShapes() {
  return (
    <>
      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/10 dark:bg-amber-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-4000" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect authenticated users to dashboard - use replace to prevent back navigation
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  // Don't render landing page if authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 min-h-[90vh] flex items-center">
        {/* Animated Background */}
        <BackgroundShapes />

        {/* Floating Icons - Left Side */}
        <div className="hidden lg:block">
          <FloatingIcon
            icon={Brain}
            className="top-32 left-[8%]"
            delay={0}
          />
          <FloatingIcon
            icon={Calculator}
            className="top-56 left-[15%]"
            size={20}
            delay={1}
          />
          <FloatingIcon
            icon={BookOpen}
            className="bottom-40 left-[10%]"
            delay={2}
          />
          <FloatingIcon
            icon={Lightbulb}
            className="bottom-72 left-[18%]"
            size={20}
            delay={0.5}
          />
        </div>

        {/* Floating Icons - Right Side */}
        <div className="hidden lg:block">
          <FloatingIcon
            icon={GraduationCap}
            className="top-36 right-[10%]"
            delay={1.5}
          />
          <FloatingIcon
            icon={FileText}
            className="top-64 right-[16%]"
            size={20}
            delay={2.5}
          />
          <FloatingIcon
            icon={Award}
            className="bottom-44 right-[8%]"
            delay={0.8}
          />
          <FloatingIcon
            icon={PenTool}
            className="bottom-80 right-[18%]"
            size={20}
            delay={3}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="text-center max-w-4xl mx-auto">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-8 animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                AI-Powered Learning System
              </span>
              <Sparkles size={14} className="text-blue-600 dark:text-blue-400" />
            </div>

            {/* Headline with Animation */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6 animate-fade-in-up animation-delay-200">
              Stuck as a Job Order?{" "}
              <span className="relative">
                <span className="text-blue-700 dark:text-blue-500">
                  Secure Your Item
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path
                    d="M2 10C50 4 100 2 150 6C200 10 250 4 298 8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="text-blue-500/40 dark:text-blue-400/40"
                    style={{
                      strokeDasharray: 300,
                      strokeDashoffset: 300,
                      animation: 'draw-line 1.5s ease-out forwards',
                      animationDelay: '1s',
                    }}
                  />
                </svg>
              </span>{" "}
              This Year.
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
              Pass your Civil Service Exam with our AI tutor that adapts to your
              learning style. Join the new generation of future Civil Servants.
            </p>

            {/* CTA Buttons with Animation */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-600">
              <Link href="/sign-up">
                <Button size="lg" icon={ArrowRight} iconPosition="right" className="group shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow">
                  <span>Start Free Trial</span>
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="group">
                  <span>See How It Works</span>
                </Button>
              </Link>
            </div>

            {/* Animated Stats Pills */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up animation-delay-800">
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-100 dark:border-slate-700">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white dark:border-slate-800"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">1,000+ Q&As</span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">100% Exam Converage</span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-full shadow-md border border-emerald-100 dark:border-emerald-800">
                <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Unlimited Mock Retakes</span>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:flex flex-col items-center gap-2">
              <span className="text-xs text-slate-400 dark:text-slate-500">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-600 rounded-full flex justify-center">
                <div className="w-1.5 h-3 bg-slate-400 dark:bg-slate-500 rounded-full mt-2 animate-scroll-down" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggeredContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={150}>
            {[
              { value: "100%", label: "Exam Coverage", icon: ShieldCheck },
              { value: "100K+", label: "Questions", icon: BookOpen },
              { value: "24/7", label: "AI Tutor", icon: Brain },
              { value: "Unlimited", label: "Mock Exams", icon: Repeat },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 mb-4">
                  <stat.icon
                    size={24}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge variant="primary" className="mb-4">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything You Need to Pass
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our platform combines AI technology with proven study methods to
              maximize your exam preparation.
            </p>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={100}>
            {[
              {
                icon: Brain,
                title: "AI Tutor",
                description:
                  "Get instant explanations and personalized guidance. Ask follow-up questions just like with a real tutor.",
                color: "blue",
              },
              {
                icon: Shield,
                title: "Pass Assurance",
                description:
                  "Our adaptive system identifies your weak areas and creates a custom study plan to maximize your score.",
                color: "emerald",
              },
              {
                icon: Smartphone,
                title: "Mobile Friendly",
                description:
                  "Study anywhere, anytime. Our responsive design works perfectly on phones, tablets, and computers.",
                color: "purple",
              },
              {
                icon: Target,
                title: "Smart Analytics",
                description:
                  "Track your progress with detailed insights. See exactly where you need to improve.",
                color: "amber",
              },
              {
                icon: Clock,
                title: "Timed Mock Exams",
                description:
                  "Simulate real exam conditions with our timed practice tests. Build confidence and speed.",
                color: "rose",
              },
              {
                icon: BookOpen,
                title: "Rich Explanations",
                description:
                  "Every question comes with detailed explanations, tips, and memory techniques.",
                color: "cyan",
              },
            ].map((feature) => (
              <Card key={feature.title} hover className="group">
                <div
                  className={`
                  inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4
                  ${feature.color === "blue" ? "bg-blue-50 dark:bg-blue-900/30" : ""}
                  ${feature.color === "emerald" ? "bg-emerald-50 dark:bg-emerald-900/30" : ""}
                  ${feature.color === "purple" ? "bg-purple-50 dark:bg-purple-900/30" : ""}
                  ${feature.color === "amber" ? "bg-amber-50 dark:bg-amber-900/30" : ""}
                  ${feature.color === "rose" ? "bg-rose-50 dark:bg-rose-900/30" : ""}
                  ${feature.color === "cyan" ? "bg-cyan-50 dark:bg-cyan-900/30" : ""}
                `}
                >
                  <feature.icon
                    size={24}
                    className={`
                    ${feature.color === "blue" ? "text-blue-600 dark:text-blue-400" : ""}
                    ${feature.color === "emerald" ? "text-emerald-600 dark:text-emerald-400" : ""}
                    ${feature.color === "purple" ? "text-purple-600 dark:text-purple-400" : ""}
                    ${feature.color === "amber" ? "text-amber-600 dark:text-amber-400" : ""}
                    ${feature.color === "rose" ? "text-rose-600 dark:text-rose-400" : ""}
                    ${feature.color === "cyan" ? "text-cyan-600 dark:text-cyan-400" : ""}
                  `}
                  />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {feature.description}
                </p>
              </Card>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Testimonials Marquee Section */}
      <section className="py-20 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <Badge variant="primary" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              What Our Reviewees Say
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Join hundreds of successful civil servants who passed with ReviewGuro.
            </p>
          </AnimatedSection>
        </div>

        {/* Row 1 - Right to Left */}
        <div className="marquee-row mb-6 overflow-hidden">
          <div
            className="flex w-max"
            style={{
              animation: "marquee-left 40s linear infinite",
            }}
          >
            {[...Array(2)].map((_, dupeIndex) => (
              <div key={dupeIndex} className="flex gap-6 px-3">
                {[
                  {
                    name: "Maria Santos",
                    role: "Newly Permanent Employee",
                    text: "I passed on my first try! The AI tutor helped me understand math concepts I've struggled with for years.",
                    rating: 5,
                  },
                  {
                    name: "Juan Dela Cruz",
                    role: "LGU Staff",
                    text: "Studying during my commute made all the difference. 30 minutes a day for 2 months and I got 83%!",
                    rating: 5,
                  },
                  {
                    name: "Anna Reyes",
                    role: "Government Intern",
                    text: "Way better than those expensive review centers. The mock exams felt exactly like the real thing.",
                    rating: 5,
                  },
                  {
                    name: "Carlo Mendoza",
                    role: "Municipal Employee",
                    text: "The AI explanations are next level. It broke down every wrong answer so I actually learned from my mistakes.",
                    rating: 5,
                  },
                  {
                    name: "Patricia Lim",
                    role: "Passed Professional Level",
                    text: "I failed twice before finding ReviewGuro. The smart analytics showed exactly where I was weak. Passed with 85%!",
                    rating: 5,
                  },
                  {
                    name: "Miguel Torres",
                    role: "DSWD Staff",
                    text: "The timed mock exams built my confidence. No more exam anxiety on the actual test day.",
                    rating: 5,
                  },
                ].map((testimonial, index) => (
                  <div
                    key={`${dupeIndex}-${index}`}
                    className="flex-shrink-0 w-[350px] p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center gap-0.5 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="text-amber-400 fill-amber-400"
                        />
                      ))}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Left to Right */}
        <div className="marquee-row overflow-hidden">
          <div
            className="flex w-max"
            style={{
              animation: "marquee-right 40s linear infinite",
            }}
          >
            {[...Array(2)].map((_, dupeIndex) => (
              <div key={dupeIndex} className="flex gap-6 px-3">
                {[
                  {
                    name: "Grace Villanueva",
                    role: "DepEd Teacher",
                    text: "Finally, a reviewer that fits my schedule. I studied after putting my kids to sleep and still passed!",
                    rating: 5,
                  },
                  {
                    name: "Roberto Garcia",
                    role: "Barangay Staff",
                    text: "₱399 is nothing compared to the ₱5,000 I wasted on a review center. This is 10x better.",
                    rating: 5,
                  },
                  {
                    name: "Jasmine Cruz",
                    role: "Fresh Graduate",
                    text: "The progress tracking kept me motivated. Seeing my scores improve week by week was so satisfying.",
                    rating: 5,
                  },
                  {
                    name: "Mark Aquino",
                    role: "Passed Sub-Professional",
                    text: "I love that I can retake mock exams unlimited times. By my 5th mock exam, I was consistently scoring 85%+.",
                    rating: 5,
                  },
                  {
                    name: "Diana Flores",
                    role: "HR Assistant",
                    text: "The verbal ability section was my weakness. The AI tutor explained grammar rules in a way that finally clicked.",
                    rating: 5,
                  },
                  {
                    name: "Kevin Ramos",
                    role: "Newly Hired Government Employee",
                    text: "Recommended this to all my colleagues. Three of us passed in the same exam batch thanks to ReviewGuro!",
                    rating: 5,
                  },
                ].map((testimonial, index) => (
                  <div
                    key={`${dupeIndex}-${index}`}
                    className="flex-shrink-0 w-[350px] p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center gap-0.5 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="text-amber-400 fill-amber-400"
                        />
                      ))}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge variant="primary" className="mb-4">
              Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Invest in Your Future
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Skip the expensive review centers. Get better results at a
              fraction of the cost.
            </p>
          </AnimatedSection>

          <StaggeredContainer className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto" staggerDelay={200}>
            {/* Free Tier */}
            <Card className="relative border-2 border-blue-500 dark:border-blue-400">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="primary">Free</Badge>
              </div>
              <div className="text-center pt-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Free Starter
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                  Limited access to features and question items.
                </p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-slate-900 dark:text-white">
                    ₱0
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    / forever
                  </span>
                </div>
                <Link href="/dashboard">
                  <Button fullWidth size="lg">
                    Get Started Now
                  </Button>
                </Link>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                <ul className="space-y-3">
                  {[
                    "Good for testing your current knowledge level.",
                    "Daily Questions (20 items/day)",
                    "Basic Score Tracking",
                    "AI Tutor Explanations (3x/day)",
                    "Mock Exam Simulator (limited)",
                    "Basic Analytics"
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <Check
                        size={18}
                        className="text-emerald-500 flex-shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
            
            {/* Season Pass */}
            <Card className="relative border-2 border-blue-500 dark:border-blue-400">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="primary">Most Popular</Badge>
              </div>
              <div className="text-center pt-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Season Pass
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                  Full access until you pass
                </p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-slate-900 dark:text-white">
                    ₱399
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    / 3 Months (Launch Offer)
                  </span>
                </div>
                <Link href="/dashboard">
                  <Button fullWidth size="lg">
                    Get Started Now
                  </Button>
                </Link>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                <ul className="space-y-3">
                  {[
                    "All features in Free Starter",
                    "1,000+ practice questions",
                    "AI Tutor - unlimited questions",
                    "Detailed explanations",
                    "Progress tracking",
                    "Mock exams with timer",
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <Check
                        size={18}
                        className="text-emerald-500 flex-shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Review Center Comparison */}
            <Card className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Traditional Review Center
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                  The old way of studying
                </p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-slate-400 dark:text-slate-500 line-through">
                    ₱5,000
                  </span>
                  <span className="text-slate-400 dark:text-slate-500">
                    /session
                  </span>
                </div>
                <div className="py-3 px-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Save <strong>₱4,601</strong> with ReviewGuro
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                <ul className="space-y-3">
                  {[
                    { text: "Fixed schedule classes", available: false },
                    { text: "Limited Q&A time", available: false },
                    { text: "Physical attendance required", available: false },
                    { text: "Generic study materials", available: false },
                    { text: "No progress tracking", available: false },
                    { text: "One-size-fits-all approach", available: false },
                    { text: "Additional fees for retakes", available: false },
                  ].map((feature) => (
                    <li
                      key={feature.text}
                      className="flex items-center gap-3 text-sm text-slate-400 dark:text-slate-500"
                    >
                      <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-300 dark:border-slate-600 flex-shrink-0" />
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </StaggeredContainer>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <Badge variant="primary" className="mb-4">
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Common Questions
            </h2>
          </AnimatedSection>

          <StaggeredContainer className="space-y-4" staggerDelay={100}>
            {[
              {
                q: "Why should I pay ₱399 when there are free reviewers on Facebook?",
                a: "Free reviewers are static PDF files that don't tell you why you're wrong. ReviewGuro is a Personal AI Coach that identifies your weak spots (e.g., Math vs. Logic) and gives you unlimited explanations. You aren't paying for questions; you're paying for the strategy to pass.",
              },
              {
                q: "How long do I have access after payment?",
                a: "Your Season Pass gives you unlimited access for 3 months. Study at your own pace.",
              },
              {
                q: "I work 8-5. Will this really help me if I only have 30 minutes a day?",
                a: "Absolutely. You don't need 2 hours. Just open the app for 15 minutes, and our algorithm will serve you the exact questions you need to improve your lowest-scoring areas. It’s designed for commuters and busy employees.",
              },
              {
                q: "Is the AI Tutor really accurate?",
                a: "Our AI is strictly prompted to follow Civil Service standards. It doesn't just give answers; it provides step-by-step solutions, especially for Math problems, so you understand the formula, not just the result.",
              },
              {
                q: "How does the AI Tutor work?",
                a: "After answering each question, you can ask our AI tutor for clarifications, alternative explanations, or related concepts. It's like having a patient tutor available 24/7.",
              },
              {
                q: "Do I need a laptop to use this?",
                a: "No. ReviewGuro UI design is fully optimized for web and mobile. You can take a mock exam on the bus, on your lunch break, or in bed. Your progress saves automatically, so you can switch between phone and laptop seamlessly.",
              },
            ].map((faq, index) => (
              <Card key={index} padding="lg">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 flex items-start gap-3">
                  <ChevronRight
                    size={20}
                    className="text-blue-600 mt-0.5 flex-shrink-0"
                  />
                  {faq.q}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 ml-8">
                  {faq.a}
                </p>
              </Card>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-700 dark:bg-blue-800 overflow-hidden">
        <AnimatedSection className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Secure Your Future?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            The smartest way to secure your 80%+ passing rate.
          </p>
          <Link href="/sign-up">
            <Button
              size="lg"
              variant="secondary"
              icon={ArrowRight}
              iconPosition="right"
            >
              Start Your Journey Today
            </Button>
          </Link>
        </AnimatedSection>
      </section>
    </PublicLayout>
  );
}
