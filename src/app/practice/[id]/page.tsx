"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Flag,
  Lightbulb,
  MessageCircle,
  Send,
  Check,
  X,
  BookOpen,
  Clock,
  ChevronLeft,
  ChevronRight,
  Brain,
  Sparkles,
  Loader2,
  Crown,
  Lock,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { Button, Card, Badge, Textarea } from "@/components/ui";
import {
  questionsApi,
  practiceApi,
  Question,
  categoryDisplayNames,
  difficultyColors,
} from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

type AnswerState = "unanswered" | "correct" | "incorrect";

interface TutorMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface TutorState {
  showHint: boolean;
  hintText: string;
  showExplanation: boolean;
  explanation: string;
  messages: TutorMessage[];
  isTyping: boolean;
}

// Store answered questions' state to retain highlighting when navigating back
interface AnsweredQuestion {
  selectedOption: string;
  answerState: AnswerState;
  correctOptionId: string;
  explanation: string;
  isFlagged: boolean;
}

// Free users are limited to 15 questions per category
const FREE_QUESTION_LIMIT = 15;

export default function PracticePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const questionId = params.id as string;
  const categoryFilter = searchParams.get("category") as Question["category"] | null;

  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const isPremium = user?.isPremium ?? false;

  const [question, setQuestion] = useState<Question | null>(null);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [correctOptionId, setCorrectOptionId] = useState<string | null>(null);
  const [isFlagged, setIsFlagged] = useState(false);
  const [sessionStartTime] = useState(() => {
    // Try to restore session start time from sessionStorage
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("practice_session_start");
      if (stored) return parseInt(stored, 10);
      const now = Date.now();
      sessionStorage.setItem("practice_session_start", now.toString());
      return now;
    }
    return Date.now();
  });
  const [timeSpent, setTimeSpent] = useState(() => {
    // Calculate initial time based on session start
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("practice_session_start");
      if (stored) {
        return Math.floor((Date.now() - parseInt(stored, 10)) / 1000);
      }
    }
    return 0;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tutorState, setTutorState] = useState<TutorState>({
    showHint: false,
    hintText: "",
    showExplanation: false,
    explanation: "",
    messages: [],
    isTyping: false,
  });
  const [chatInput, setChatInput] = useState("");

  // Generate a storage key that includes category filter for separate sessions
  const storageKey = `practice_answered_questions${categoryFilter ? `_${categoryFilter}` : ""}`;

  // Initialize ref with data from sessionStorage immediately (not in useEffect)
  const getInitialAnswers = (): Record<string, AnsweredQuestion> => {
    if (typeof window === "undefined") return {};
    try {
      const stored = sessionStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  // Use ref to persist answered questions across navigation without causing re-renders
  const answeredQuestionsRef = useRef<Record<string, AnsweredQuestion>>(getInitialAnswers());

  // Sync ref with sessionStorage whenever storageKey changes (e.g., when category changes)
  useEffect(() => {
    const stored = sessionStorage.getItem(storageKey);
    if (stored) {
      try {
        answeredQuestionsRef.current = JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse stored answers:", e);
      }
    } else {
      answeredQuestionsRef.current = {};
    }
  }, [storageKey]);

  // Load questions - only fetch if we don't have them yet or category changed
  useEffect(() => {
    async function fetchQuestions() {
      if (!isAuthenticated) return;

      // Check if we already have questions loaded for this category
      const needsFetch = allQuestions.length === 0 ||
        (categoryFilter && !allQuestions.some(q => q.category === categoryFilter));

      if (needsFetch) {
        setIsLoading(true);
        try {
          const response = await questionsApi.getQuestions({
            category: categoryFilter || undefined,
            limit: 50,
          });

          if (response.data && response.data.length > 0) {
            // Limit questions for free users
            const limitedQuestions = isPremium
              ? response.data
              : response.data.slice(0, FREE_QUESTION_LIMIT);

            setAllQuestions(limitedQuestions);

            // Find the current question
            const currentQ = limitedQuestions.find((q) => q.id === questionId);
            if (currentQ) {
              setQuestion(currentQ);
            } else {
              // If question ID not found, use first question
              setQuestion(limitedQuestions[0]);
              router.replace(`/practice/${limitedQuestions[0].id}${categoryFilter ? `?category=${categoryFilter}` : ""}`);
            }
          }
        } catch (error) {
          console.error("Error fetching questions:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        // We already have questions, just find the current one
        const currentQ = allQuestions.find((q) => q.id === questionId);
        if (currentQ) {
          setQuestion(currentQ);
        }
        setIsLoading(false);
      }
    }

    if (!authLoading) {
      fetchQuestions();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, authLoading, categoryFilter, questionId, router, isPremium]);

  // Reset or restore state when question changes
  useEffect(() => {
    if (question) {
      // Load from sessionStorage first to ensure we have the latest data
      const stored = sessionStorage.getItem(storageKey);
      if (stored) {
        try {
          answeredQuestionsRef.current = JSON.parse(stored);
        } catch (e) {
          console.error("Failed to parse stored answers:", e);
        }
      }

      // Check if this question was previously answered
      const previousAnswer = answeredQuestionsRef.current[question.id];

      if (previousAnswer) {
        // Restore the previous answer state
        setSelectedOption(previousAnswer.selectedOption);
        setAnswerState(previousAnswer.answerState);
        setCorrectOptionId(previousAnswer.correctOptionId);
        setIsFlagged(previousAnswer.isFlagged || false);
        setTutorState({
          showHint: false,
          hintText: "",
          showExplanation: true,
          explanation: previousAnswer.explanation,
          messages: [],
          isTyping: false,
        });
      } else {
        // Reset state for new/unanswered questions
        setSelectedOption(null);
        setAnswerState("unanswered");
        setCorrectOptionId(null);
        setIsFlagged(false);
        setTutorState({
          showHint: false,
          hintText: "",
          showExplanation: false,
          explanation: "",
          messages: [],
          isTyping: false,
        });
      }
    }
  }, [question?.id, storageKey]);

  // Session timer - continuous across questions
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionStartTime]);

  const currentIndex = allQuestions.findIndex((q) => q.id === questionId);
  const totalQuestions = allQuestions.length;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (optionId: string) => {
    if (answerState !== "unanswered") return;
    setSelectedOption(optionId);
  };

  const handleSubmitAnswer = async () => {
    if (!selectedOption || !question) return;

    setIsSubmitting(true);
    try {
      const response = await practiceApi.submitAnswer(question.id, selectedOption);

      if (response.data) {
        const newAnswerState = response.data.isCorrect ? "correct" : "incorrect";
        setAnswerState(newAnswerState);
        setCorrectOptionId(response.data.correctOptionId);
        setTutorState((prev) => ({
          ...prev,
          showExplanation: true,
          explanation: response.data.explanation,
        }));

        // Save the answer to ref and sessionStorage to retain state when navigating back
        answeredQuestionsRef.current[question.id] = {
          selectedOption,
          answerState: newAnswerState,
          correctOptionId: response.data.correctOptionId,
          explanation: response.data.explanation,
          isFlagged,
        };
        sessionStorage.setItem(storageKey, JSON.stringify(answeredQuestionsRef.current));
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      // Fallback to basic feedback
      setAnswerState("incorrect");
      setTutorState((prev) => ({
        ...prev,
        showExplanation: true,
        explanation: "Unable to load explanation. Please try again.",
      }));

      // Save the fallback answer state too
      answeredQuestionsRef.current[question.id] = {
        selectedOption,
        answerState: "incorrect",
        correctOptionId: "",
        explanation: "Unable to load explanation. Please try again.",
        isFlagged,
      };
      sessionStorage.setItem(storageKey, JSON.stringify(answeredQuestionsRef.current));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleFlag = () => {
    if (!question) return;

    const newFlaggedState = !isFlagged;
    setIsFlagged(newFlaggedState);

    // Update sessionStorage to persist flag state
    const existingAnswer = answeredQuestionsRef.current[question.id];
    if (existingAnswer) {
      answeredQuestionsRef.current[question.id] = {
        ...existingAnswer,
        isFlagged: newFlaggedState,
      };
    } else {
      // Store just the flag for unanswered questions
      answeredQuestionsRef.current[question.id] = {
        selectedOption: "",
        answerState: "unanswered",
        correctOptionId: "",
        explanation: "",
        isFlagged: newFlaggedState,
      };
    }
    sessionStorage.setItem(storageKey, JSON.stringify(answeredQuestionsRef.current));
  };

  const handleGetHint = async () => {
    if (!question) return;

    // If question already has a hint, use it directly
    if (question.hint) {
      setTutorState((prev) => ({
        ...prev,
        showHint: true,
        hintText: question.hint || "",
        isTyping: false,
      }));
      return;
    }

    setTutorState((prev) => ({ ...prev, isTyping: true, showHint: true }));

    try {
      // Try to get hint from dedicated hint API
      const response = await practiceApi.getHint(question.id);
      if (response.data?.hint) {
        setTutorState((prev) => ({
          ...prev,
          showHint: true,
          hintText: response.data.hint,
          isTyping: false,
        }));
        return;
      }
    } catch (error) {
      console.error("Error getting hint from API:", error);
    }

    // Provide a fallback hint based on the question category
    const fallbackHints: Record<string, string> = {
      VERBAL_ABILITY: "Focus on the context and meaning of words. Look for synonyms, antonyms, or relationships between concepts.",
      NUMERICAL_ABILITY: "Break down the problem step by step. Identify what values you have and what you need to find.",
      ANALYTICAL_ABILITY: "Look for patterns and logical relationships. Consider what must be true based on the given information.",
      GENERAL_INFORMATION: "Think about what you know about Philippine history, government, and current events.",
      CLERICAL_ABILITY: "Pay close attention to details like spelling, alphabetical order, and numerical sequences.",
    };
    setTutorState((prev) => ({
      ...prev,
      showHint: true,
      hintText: fallbackHints[question.category] || "Read the question carefully and eliminate obviously wrong answers first.",
      isTyping: false,
    }));
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || !question) return;

    const userMessage: TutorMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: chatInput,
      timestamp: new Date().toISOString(),
    };

    setTutorState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
    }));
    setChatInput("");

    // Get AI explanation for the question
    try {
      const response = await practiceApi.getExplanation(question.id);
      const aiMessage: TutorMessage = {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: response.data?.explanation || "I can help you understand this question better. The key is to analyze each option carefully and apply the relevant concepts.",
        timestamp: new Date().toISOString(),
      };

      setTutorState((prev) => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        isTyping: false,
      }));
    } catch {
      const aiMessage: TutorMessage = {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: "I'm here to help! Let me explain this concept. Focus on the key details in the question and eliminate obviously incorrect options first.",
        timestamp: new Date().toISOString(),
      };

      setTutorState((prev) => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        isTyping: false,
      }));
    }
  };

  const navigateToQuestion = (direction: "prev" | "next") => {
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < totalQuestions) {
      const nextQuestion = allQuestions[newIndex];
      router.push(`/practice/${nextQuestion.id}${categoryFilter ? `?category=${categoryFilter}` : ""}`);
    }
  };

  if (authLoading || isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  if (!question) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <BookOpen
              size={48}
              className="mx-auto text-slate-300 dark:text-slate-600 mb-4"
            />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Question not found
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              The question you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/practice">
              <Button>Return to Practice</Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const difficultyStyle = difficultyColors[question.difficulty];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Link href="/practice">
              <Button variant="ghost" size="sm" icon={ArrowLeft}>
                Exit
              </Button>
            </Link>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <Badge variant="primary">
                {categoryDisplayNames[question.category]}
              </Badge>
              <Badge className={`${difficultyStyle.bg} ${difficultyStyle.text}`}>
                {question.difficulty}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Session Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700">
              <Clock size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span className="font-mono font-semibold text-sm text-emerald-700 dark:text-emerald-300">
                {formatTime(timeSpent)}
              </span>
            </div>
            {totalQuestions > 0 && (
              <div className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                <span>{currentIndex + 1}</span>
                <span className="text-slate-400">/</span>
                <span>{totalQuestions}</span>
              </div>
            )}
            <Button
              variant={isFlagged ? "danger" : "outline"}
              size="sm"
              icon={Flag}
              onClick={handleToggleFlag}
            >
              {isFlagged ? "Flagged" : "Flag"}
            </Button>
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Panel - Question */}
          <div className="space-y-6">
            <Card padding="lg">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white leading-relaxed whitespace-pre-line">
                  {question.questionText}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option) => {
                  const isSelected = selectedOption === option.id;
                  const isCorrect = correctOptionId === option.id;
                  const showResult = answerState !== "unanswered";

                  let optionClasses =
                    "relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ";

                  if (showResult) {
                    if (isCorrect) {
                      // Always highlight the correct answer in green
                      optionClasses +=
                        "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20";
                    } else if (isSelected && answerState === "incorrect") {
                      // Highlight wrong selection in red
                      optionClasses +=
                        "border-rose-500 bg-rose-50 dark:bg-rose-900/20";
                    } else {
                      optionClasses +=
                        "border-slate-200 dark:border-slate-700 opacity-50";
                    }
                  } else {
                    if (isSelected) {
                      optionClasses +=
                        "border-blue-500 bg-blue-50 dark:bg-blue-900/20";
                    } else {
                      optionClasses +=
                        "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800";
                    }
                  }

                  return (
                    <div
                      key={option.id}
                      className={optionClasses}
                      onClick={() => handleOptionSelect(option.id)}
                    >
                      <div
                        className={`
                        w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm shrink-0
                        ${
                          showResult && isCorrect
                            ? "bg-emerald-500 text-white"
                            : showResult && isSelected && answerState === "incorrect"
                              ? "bg-rose-500 text-white"
                              : isSelected
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }
                      `}
                      >
                        {showResult && isCorrect ? (
                          <Check size={16} />
                        ) : showResult && isSelected && answerState === "incorrect" ? (
                          <X size={16} />
                        ) : (
                          option.id.toUpperCase()
                        )}
                      </div>
                      <span
                        className={`text-base pt-1 ${
                          showResult && isCorrect
                            ? "text-emerald-900 dark:text-emerald-100 font-medium"
                            : showResult && isSelected && answerState === "incorrect"
                              ? "text-rose-900 dark:text-rose-100"
                              : "text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {option.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Submit Button */}
              {answerState === "unanswered" && (
                <div className="mt-6">
                  <Button
                    fullWidth
                    size="lg"
                    disabled={!selectedOption}
                    isLoading={isSubmitting}
                    onClick={handleSubmitAnswer}
                  >
                    Submit Answer
                  </Button>
                </div>
              )}
            </Card>

            {/* Free User Limit Banner */}
            {!isPremium && currentIndex >= totalQuestions - 1 && totalQuestions === FREE_QUESTION_LIMIT && (
              <Card className="border-2 border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0">
                    <Crown size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                      You&apos;ve reached the free limit
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      Free users can practice up to {FREE_QUESTION_LIMIT} questions per category. Upgrade to Season Pass for unlimited access to all questions.
                    </p>
                    <Link href="/pricing">
                      <Button
                        size="sm"
                        icon={Crown}
                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                      >
                        Upgrade for Unlimited Access
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                icon={ChevronLeft}
                disabled={currentIndex <= 0}
                onClick={() => navigateToQuestion("prev")}
              >
                Previous
              </Button>
              <Button
                variant={answerState !== "unanswered" ? "primary" : "outline"}
                icon={ChevronRight}
                iconPosition="right"
                disabled={currentIndex >= totalQuestions - 1}
                onClick={() => navigateToQuestion("next")}
              >
                {!isPremium && currentIndex >= totalQuestions - 1 && totalQuestions === FREE_QUESTION_LIMIT ? (
                  <span className="flex items-center gap-1">
                    <Lock size={14} />
                    Limit Reached
                  </span>
                ) : (
                  "Next Question"
                )}
              </Button>
            </div>
          </div>

          {/* Right Panel - Interactive Tutor */}
          <div className="space-y-6">
            {/* Tutor Status Card */}
            <Card
              className={`${
                answerState === "unanswered"
                  ? "bg-slate-50 dark:bg-slate-800/50"
                  : answerState === "correct"
                    ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                    : "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    answerState === "unanswered"
                      ? "bg-blue-100 dark:bg-blue-900/50"
                      : answerState === "correct"
                        ? "bg-emerald-100 dark:bg-emerald-900/50"
                        : "bg-rose-100 dark:bg-rose-900/50"
                  }`}
                >
                  <Brain
                    size={20}
                    className={`${
                      answerState === "unanswered"
                        ? "text-blue-600 dark:text-blue-400"
                        : answerState === "correct"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    AI Tutor
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {answerState === "unanswered"
                      ? "Select an answer to continue"
                      : answerState === "correct"
                        ? "Excellent work!"
                        : "Let's learn from this"}
                  </p>
                </div>
              </div>

              {/* Status Message */}
              {answerState !== "unanswered" && (
                <div
                  className={`p-4 rounded-lg mb-4 ${
                    answerState === "correct"
                      ? "bg-emerald-100 dark:bg-emerald-900/30"
                      : "bg-rose-100 dark:bg-rose-900/30"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {answerState === "correct" ? (
                      <Check
                        size={18}
                        className="text-emerald-600 dark:text-emerald-400"
                      />
                    ) : (
                      <X
                        size={18}
                        className="text-rose-600 dark:text-rose-400"
                      />
                    )}
                    <span
                      className={`font-semibold ${
                        answerState === "correct"
                          ? "text-emerald-700 dark:text-emerald-300"
                          : "text-rose-700 dark:text-rose-300"
                      }`}
                    >
                      {answerState === "correct" ? "Correct!" : "Incorrect"}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      answerState === "correct"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {answerState === "correct"
                      ? "You got it right! Read the explanation below to reinforce your understanding."
                      : "Don't worry! Review the explanation to understand the correct answer."}
                  </p>
                </div>
              )}

              {/* Get Hint Button (Before Answer) */}
              {answerState === "unanswered" && !tutorState.showHint && (
                <Button
                  variant="outline"
                  fullWidth
                  icon={Lightbulb}
                  onClick={handleGetHint}
                  disabled={tutorState.isTyping}
                  isLoading={tutorState.isTyping}
                >
                  Need a Hint?
                </Button>
              )}

              {/* Hint Display */}
              {tutorState.showHint && tutorState.hintText && (
                <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb
                      size={16}
                      className="text-amber-600 dark:text-amber-400"
                    />
                    <span className="font-medium text-amber-700 dark:text-amber-300">
                      Hint
                    </span>
                  </div>
                  <p className="text-sm text-amber-800 dark:text-amber-200 whitespace-pre-line">
                    {tutorState.hintText}
                  </p>
                </div>
              )}

              {/* Loading state for hint */}
              {tutorState.showHint && !tutorState.hintText && tutorState.isTyping && (
                <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-amber-600 dark:text-amber-400" />
                    <span className="text-sm text-amber-700 dark:text-amber-300">
                      Getting hint...
                    </span>
                  </div>
                </div>
              )}
            </Card>

            {/* Explanation Card (After Answer) */}
            {tutorState.showExplanation && tutorState.explanation && (
              <Card>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={18} className="text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Explanation
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {tutorState.explanation}
                </p>
              </Card>
            )}

            {/* Chat with AI Tutor */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle
                  size={18}
                  className="text-blue-600 dark:text-blue-400"
                />
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Ask AI Tutor
                </h3>
              </div>

              {/* Chat Messages */}
              {tutorState.messages.length > 0 && (
                <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                  {tutorState.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-xl text-sm whitespace-pre-line ${
                          msg.role === "user"
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-bl-none"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {tutorState.isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl rounded-bl-none">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                          <span
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <span
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Chat Input */}
              <div className="flex gap-2">
                <Textarea
                  placeholder="Ask a follow-up question..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="min-h-[44px] max-h-[120px]"
                  rows={1}
                />
                <Button
                  icon={Send}
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim() || tutorState.isTyping}
                />
              </div>

              {/* Suggested Questions */}
              <div className="mt-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  Suggested questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Can you explain this differently?",
                    "What's the key concept here?",
                    "Give me a tip for similar questions",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      onClick={() => {
                        setChatInput(suggestion);
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
