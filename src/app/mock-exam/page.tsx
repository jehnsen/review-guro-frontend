"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Clock,
  AlertTriangle,
  Play,
  CheckCircle2,
  XCircle,
  Flag,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Trophy,
  Target,
  BarChart3,
  RotateCcw,
  Home,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout";
import { Button, Card, CardTitle, Badge } from "@/components/ui";
import { mockQuestions } from "@/lib/mock-data";
import { Question, QuestionOption, getCategoryDisplayName } from "@/lib/types";

type ExamState = "setup" | "in-progress" | "review" | "completed";

interface ExamAnswer {
  questionId: string;
  selectedOptionId: string | null;
  isFlagged: boolean;
}

const EXAM_DURATION_MINUTES = 10; // Shortened for demo (real exam would be 170 minutes)

export default function MockExamPage() {
  const [examState, setExamState] = useState<ExamState>("setup");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<ExamAnswer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(EXAM_DURATION_MINUTES * 60);
  const [showNavigator, setShowNavigator] = useState(false);
  const [examQuestions] = useState<Question[]>(mockQuestions);

  const currentQuestion = examQuestions[currentQuestionIndex];

  // Initialize answers when exam starts
  const startExam = () => {
    const initialAnswers: ExamAnswer[] = examQuestions.map((q) => ({
      questionId: q.id,
      selectedOptionId: null,
      isFlagged: false,
    }));
    setAnswers(initialAnswers);
    setTimeRemaining(EXAM_DURATION_MINUTES * 60);
    setCurrentQuestionIndex(0);
    setExamState("in-progress");
  };

  // Timer effect
  useEffect(() => {
    if (examState !== "in-progress") return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setExamState("completed");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examState]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Get time color based on remaining time
  const getTimeColor = () => {
    const percentage = (timeRemaining / (EXAM_DURATION_MINUTES * 60)) * 100;
    if (percentage <= 10) return "text-rose-600 dark:text-rose-400";
    if (percentage <= 25) return "text-amber-600 dark:text-amber-400";
    return "text-slate-900 dark:text-white";
  };

  // Handle answer selection
  const selectAnswer = (optionId: string) => {
    setAnswers((prev) =>
      prev.map((a) =>
        a.questionId === currentQuestion.id
          ? { ...a, selectedOptionId: optionId }
          : a
      )
    );
  };

  // Toggle flag
  const toggleFlag = () => {
    setAnswers((prev) =>
      prev.map((a) =>
        a.questionId === currentQuestion.id ? { ...a, isFlagged: !a.isFlagged } : a
      )
    );
  };

  // Navigation
  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setShowNavigator(false);
  };

  const goNext = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Submit exam
  const submitExam = () => {
    setExamState("completed");
  };

  // Calculate results
  const calculateResults = useCallback(() => {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    answers.forEach((answer) => {
      const question = examQuestions.find((q) => q.id === answer.questionId);
      if (!question) return;

      if (!answer.selectedOptionId) {
        unanswered++;
      } else if (answer.selectedOptionId === question.correctAnswerId) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const score = Math.round((correct / examQuestions.length) * 100);
    const passed = score >= 80;

    return { correct, incorrect, unanswered, score, passed };
  }, [answers, examQuestions]);

  // Get current answer
  const getCurrentAnswer = () => {
    return answers.find((a) => a.questionId === currentQuestion?.id);
  };

  // Setup Screen
  if (examState === "setup") {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Mock Examination
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Simulate real exam conditions with timed practice
            </p>
          </div>

          <Card className="mb-6">
            <CardTitle className="mb-4">Exam Details</CardTitle>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Total Questions</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {examQuestions.length} questions
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Time Limit</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {EXAM_DURATION_MINUTES} minutes
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Passing Score</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  80%
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-slate-600 dark:text-slate-400">Categories</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  Mixed
                </span>
              </div>
            </div>
          </Card>

          <Card className="mb-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <div className="flex gap-3">
              <AlertTriangle className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                  Important Instructions
                </h3>
                <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                  <li>• Once started, the timer cannot be paused</li>
                  <li>• You can flag questions to review later</li>
                  <li>• Use the navigator to jump between questions</li>
                  <li>• Unanswered questions count as incorrect</li>
                </ul>
              </div>
            </div>
          </Card>

          <Button size="lg" fullWidth icon={Play} onClick={startExam}>
            Start Mock Exam
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Completed Screen
  if (examState === "completed") {
    const results = calculateResults();

    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                results.passed
                  ? "bg-emerald-100 dark:bg-emerald-900/30"
                  : "bg-rose-100 dark:bg-rose-900/30"
              }`}
            >
              {results.passed ? (
                <Trophy size={40} className="text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Target size={40} className="text-rose-600 dark:text-rose-400" />
              )}
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {results.passed ? "Congratulations!" : "Keep Practicing!"}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {results.passed
                ? "You passed the mock examination!"
                : "You didn't reach the passing score this time."}
            </p>
          </div>

          {/* Score Card */}
          <Card className="mb-6">
            <div className="text-center py-6">
              <div
                className={`text-6xl font-bold mb-2 ${
                  results.passed
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {results.score}%
              </div>
              <p className="text-slate-500 dark:text-slate-400">Your Score</p>
              <Badge
                variant={results.passed ? "success" : "danger"}
                className="mt-3"
              >
                {results.passed ? "PASSED" : "FAILED"} (80% required)
              </Badge>
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="text-center" padding="sm">
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {results.correct}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Correct</p>
            </Card>
            <Card className="text-center" padding="sm">
              <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                {results.incorrect}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Incorrect</p>
            </Card>
            <Card className="text-center" padding="sm">
              <div className="text-2xl font-bold text-slate-400">
                {results.unanswered}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Unanswered</p>
            </Card>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              fullWidth
              variant="outline"
              icon={BarChart3}
              onClick={() => setExamState("review")}
            >
              Review Answers
            </Button>
            <Button fullWidth icon={RotateCcw} onClick={() => setExamState("setup")}>
              Take Another Exam
            </Button>
            <Link href="/dashboard">
              <Button fullWidth variant="ghost" icon={Home}>
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Review Screen
  if (examState === "review") {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Review Answers
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                See which questions you got right and wrong
              </p>
            </div>
            <Button variant="outline" onClick={() => setExamState("completed")}>
              Back to Results
            </Button>
          </div>

          <div className="space-y-4">
            {examQuestions.map((question, index) => {
              const answer = answers.find((a) => a.questionId === question.id);
              const isCorrect = answer?.selectedOptionId === question.correctAnswerId;
              const wasAnswered = !!answer?.selectedOptionId;

              return (
                <Card key={question.id} padding="lg">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        !wasAnswered
                          ? "bg-slate-100 dark:bg-slate-800"
                          : isCorrect
                            ? "bg-emerald-100 dark:bg-emerald-900/30"
                            : "bg-rose-100 dark:bg-rose-900/30"
                      }`}
                    >
                      {!wasAnswered ? (
                        <span className="text-sm font-medium text-slate-500">
                          {index + 1}
                        </span>
                      ) : isCorrect ? (
                        <CheckCircle2
                          size={18}
                          className="text-emerald-600 dark:text-emerald-400"
                        />
                      ) : (
                        <XCircle size={18} className="text-rose-600 dark:text-rose-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="default" size="sm">
                          {getCategoryDisplayName(question.category)}
                        </Badge>
                        {answer?.isFlagged && (
                          <Badge variant="warning" size="sm">
                            Flagged
                          </Badge>
                        )}
                      </div>
                      <p className="text-slate-900 dark:text-white mb-3">
                        {question.text}
                      </p>

                      <div className="space-y-2">
                        {question.options.map((option: QuestionOption) => {
                          const isSelected = answer?.selectedOptionId === option.id;
                          const isCorrectOption =
                            option.id === question.correctAnswerId;

                          return (
                            <div
                              key={option.id}
                              className={`flex items-center gap-3 p-3 rounded-lg text-sm ${
                                isCorrectOption
                                  ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
                                  : isSelected && !isCorrectOption
                                    ? "bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800"
                                    : "bg-slate-50 dark:bg-slate-800/50"
                              }`}
                            >
                              <span
                                className={`w-6 h-6 rounded flex items-center justify-center text-xs font-medium ${
                                  isCorrectOption
                                    ? "bg-emerald-500 text-white"
                                    : isSelected
                                      ? "bg-rose-500 text-white"
                                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                                }`}
                              >
                                {option.label}
                              </span>
                              <span
                                className={
                                  isCorrectOption
                                    ? "text-emerald-900 dark:text-emerald-100"
                                    : isSelected
                                      ? "text-rose-900 dark:text-rose-100"
                                      : "text-slate-600 dark:text-slate-400"
                                }
                              >
                                {option.text}
                              </span>
                              {isCorrectOption && (
                                <CheckCircle2
                                  size={16}
                                  className="text-emerald-600 dark:text-emerald-400 ml-auto"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <span className="font-medium">Explanation: </span>
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // In-Progress Screen
  const currentAnswer = getCurrentAnswer();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Badge variant="primary">Mock Exam</Badge>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Question {currentQuestionIndex + 1} of {examQuestions.length}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer */}
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 ${getTimeColor()}`}
            >
              <Clock size={18} />
              <span className="font-mono font-bold text-lg">
                {formatTime(timeRemaining)}
              </span>
            </div>

            {/* Navigator Toggle */}
            <Button
              variant="outline"
              size="sm"
              icon={LayoutGrid}
              onClick={() => setShowNavigator(!showNavigator)}
            >
              Navigator
            </Button>
          </div>
        </div>

        {/* Question Navigator Modal */}
        {showNavigator && (
          <Card className="mb-6 animate-fade-in">
            <CardTitle className="mb-4">Question Navigator</CardTitle>
            <div className="grid grid-cols-10 gap-2">
              {examQuestions.map((q, index) => {
                const answer = answers.find((a) => a.questionId === q.id);
                const isAnswered = !!answer?.selectedOptionId;
                const isFlagged = answer?.isFlagged;
                const isCurrent = index === currentQuestionIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(index)}
                    className={`
                      w-10 h-10 rounded-lg text-sm font-medium transition-all relative
                      ${
                        isCurrent
                          ? "bg-blue-600 text-white ring-2 ring-blue-300"
                          : isAnswered
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }
                    `}
                  >
                    {index + 1}
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-emerald-100 dark:bg-emerald-900/30" />
                <span className="text-slate-600 dark:text-slate-400">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-slate-100 dark:bg-slate-800" />
                <span className="text-slate-600 dark:text-slate-400">Unanswered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-amber-500" />
                <span className="text-slate-600 dark:text-slate-400">Flagged</span>
              </div>
            </div>
          </Card>
        )}

        {/* Question Card */}
        <Card padding="lg" className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="default">
              {getCategoryDisplayName(currentQuestion.category)}
            </Badge>
            <Button
              variant={currentAnswer?.isFlagged ? "danger" : "ghost"}
              size="sm"
              icon={Flag}
              onClick={toggleFlag}
            >
              {currentAnswer?.isFlagged ? "Flagged" : "Flag"}
            </Button>
          </div>

          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 leading-relaxed">
            {currentQuestion.text}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option: QuestionOption) => {
              const isSelected = currentAnswer?.selectedOptionId === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => selectAnswer(option.id)}
                  className={`
                    w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all
                    ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }
                  `}
                >
                  <span
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm shrink-0
                      ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }
                    `}
                  >
                    {option.label}
                  </span>
                  <span
                    className={`text-base ${
                      isSelected
                        ? "text-blue-900 dark:text-blue-100"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            icon={ChevronLeft}
            onClick={goPrev}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>

          <div className="flex items-center gap-3">
            {currentQuestionIndex === examQuestions.length - 1 ? (
              <Button variant="primary" onClick={submitExam}>
                Submit Exam
              </Button>
            ) : (
              <Button
                icon={ChevronRight}
                iconPosition="right"
                onClick={goNext}
              >
                Next
              </Button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-2">
            <span>Progress</span>
            <span>
              {answers.filter((a) => a.selectedOptionId).length} of{" "}
              {examQuestions.length} answered
            </span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (answers.filter((a) => a.selectedOptionId).length /
                    examQuestions.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
