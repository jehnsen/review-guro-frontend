"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
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
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { Button, Card, Badge, Textarea } from "@/components/ui";
import { mockQuestions, getQuestionById } from "@/lib/mock-data";
import {
  Question,
  QuestionOption,
  TutorMessage,
  getCategoryDisplayName,
  getDifficultyColor,
} from "@/lib/types";

type AnswerState = "unanswered" | "correct" | "incorrect";

interface TutorState {
  showHint: boolean;
  showExplanation: boolean;
  messages: TutorMessage[];
  isTyping: boolean;
}

export default function PracticePage() {
  const params = useParams();
  const router = useRouter();
  const questionId = params.id as string;

  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [isFlagged, setIsFlagged] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [tutorState, setTutorState] = useState<TutorState>({
    showHint: false,
    showExplanation: false,
    messages: [],
    isTyping: false,
  });
  const [chatInput, setChatInput] = useState("");

  // Get current question index
  const currentIndex = mockQuestions.findIndex((q) => q.id === questionId);
  const totalQuestions = mockQuestions.length;

  useEffect(() => {
    const q = getQuestionById(questionId);
    if (q) {
      setQuestion(q);
      // Reset state for new question
      setSelectedOption(null);
      setAnswerState("unanswered");
      setTutorState({
        showHint: false,
        showExplanation: false,
        messages: [],
        isTyping: false,
      });
      setTimeSpent(0);
    }
  }, [questionId]);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [questionId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (optionId: string) => {
    if (answerState !== "unanswered") return;
    setSelectedOption(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || !question) return;

    const isCorrect = selectedOption === question.correctAnswerId;
    setAnswerState(isCorrect ? "correct" : "incorrect");
    setTutorState((prev) => ({ ...prev, showExplanation: true }));
  };

  const handleShowHint = () => {
    if (!question?.hint) return;
    setTutorState((prev) => ({ ...prev, showHint: true }));
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

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

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Great question! Let me explain this concept further. The key to solving this type of problem is to break it down into smaller, manageable steps. First, identify what information you're given, then determine what you need to find.",
        "I understand your confusion. This is a common area where many students struggle. Think of it this way: the question is testing your ability to apply logical reasoning. Start by eliminating obviously wrong answers.",
        "That's a thoughtful follow-up! To deepen your understanding, consider practicing similar problems. The pattern here is consistent across many Civil Service Exam questions.",
      ];

      const aiMessage: TutorMessage = {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date().toISOString(),
      };

      setTutorState((prev) => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        isTyping: false,
      }));
    }, 1500);
  };

  const navigateToQuestion = (direction: "prev" | "next") => {
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < totalQuestions) {
      router.push(`/practice/${mockQuestions[newIndex].id}`);
    }
  };

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
            <Link href="/dashboard">
              <Button>Return to Dashboard</Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" icon={ArrowLeft}>
                Exit
              </Button>
            </Link>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <Badge variant="primary">{getCategoryDisplayName(question.category)}</Badge>
              <Badge className={getDifficultyColor(question.difficulty)}>
                {question.difficulty.charAt(0).toUpperCase() +
                  question.difficulty.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Clock size={16} />
              <span>{formatTime(timeSpent)}</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-300">
              <span>{currentIndex + 1}</span>
              <span className="text-slate-400">/</span>
              <span>{totalQuestions}</span>
            </div>
            <Button
              variant={isFlagged ? "danger" : "outline"}
              size="sm"
              icon={Flag}
              onClick={() => setIsFlagged(!isFlagged)}
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
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white leading-relaxed">
                  {question.text}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option: QuestionOption) => {
                  const isSelected = selectedOption === option.id;
                  const isCorrect = option.id === question.correctAnswerId;
                  const showResult = answerState !== "unanswered";

                  let optionClasses =
                    "relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ";

                  if (showResult) {
                    if (isCorrect) {
                      optionClasses +=
                        "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20";
                    } else if (isSelected && !isCorrect) {
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
                            : showResult && isSelected && !isCorrect
                              ? "bg-rose-500 text-white"
                              : isSelected
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }
                      `}
                      >
                        {showResult && isCorrect ? (
                          <Check size={16} />
                        ) : showResult && isSelected && !isCorrect ? (
                          <X size={16} />
                        ) : (
                          option.label
                        )}
                      </div>
                      <span
                        className={`text-base pt-1 ${
                          showResult && isCorrect
                            ? "text-emerald-900 dark:text-emerald-100 font-medium"
                            : showResult && isSelected && !isCorrect
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
                    onClick={handleSubmitAnswer}
                  >
                    Submit Answer
                  </Button>
                </div>
              )}
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                icon={ChevronLeft}
                disabled={currentIndex === 0}
                onClick={() => navigateToQuestion("prev")}
              >
                Previous
              </Button>
              <Button
                variant={answerState !== "unanswered" ? "primary" : "outline"}
                icon={ChevronRight}
                iconPosition="right"
                disabled={currentIndex === totalQuestions - 1}
                onClick={() => navigateToQuestion("next")}
              >
                Next Question
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

              {/* Hint Button (Before Answer) */}
              {answerState === "unanswered" && question.hint && !tutorState.showHint && (
                <Button
                  variant="outline"
                  fullWidth
                  icon={Lightbulb}
                  onClick={handleShowHint}
                >
                  Need a Hint?
                </Button>
              )}

              {/* Hint Display */}
              {tutorState.showHint && (
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
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    {question.hint}
                  </p>
                </div>
              )}
            </Card>

            {/* Explanation Card (After Answer) */}
            {tutorState.showExplanation && (
              <Card className="animate-slide-up">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={18} className="text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Explanation
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {question.explanation}
                </p>
              </Card>
            )}

            {/* Chat with AI Tutor (After Answer) */}
            {answerState !== "unanswered" && (
              <Card className="animate-slide-up">
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
                          className={`max-w-[85%] p-3 rounded-xl text-sm ${
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
                      "Show me a similar problem",
                      "What's the key concept here?",
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
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
