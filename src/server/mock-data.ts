import {
  Question,
  User,
  QuizSession,
  CategoryPerformance,
  DailyProgress,
} from "./types";

// Sample Civil Service Questions
export const mockQuestions: Question[] = [
  {
    id: "q1",
    category: "numerical-reasoning",
    difficulty: "medium",
    text: "A government office has a budget of ₱450,000 for office supplies. If they have already spent ₱127,500 on paper and ₱85,000 on ink cartridges, what percentage of the budget remains?",
    options: [
      { id: "q1-a", label: "A", text: "47.22%" },
      { id: "q1-b", label: "B", text: "52.78%" },
      { id: "q1-c", label: "C", text: "57.22%" },
      { id: "q1-d", label: "D", text: "42.78%" },
    ],
    correctAnswerId: "q1-b",
    explanation:
      "First, calculate the total spent: ₱127,500 + ₱85,000 = ₱212,500. Then calculate the remaining budget: ₱450,000 - ₱212,500 = ₱237,500. Finally, find the percentage: (₱237,500 ÷ ₱450,000) × 100 = 52.78%. This is a common type of budget calculation problem you'll encounter in the Civil Service Exam.",
    hint: "Add the expenses first, then subtract from total to find remaining amount. Convert to percentage by dividing by total and multiplying by 100.",
    tags: ["percentage", "budget", "basic-math"],
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "q2",
    category: "verbal-reasoning",
    difficulty: "easy",
    text: 'Choose the word that best completes the sentence: "The new policy was implemented to _____ the efficiency of public services."',
    options: [
      { id: "q2-a", label: "A", text: "enhance" },
      { id: "q2-b", label: "B", text: "demolish" },
      { id: "q2-c", label: "C", text: "ignore" },
      { id: "q2-d", label: "D", text: "complicate" },
    ],
    correctAnswerId: "q2-a",
    explanation:
      '"Enhance" means to improve or increase the quality of something. In the context of public services, policies are typically implemented to make services better, faster, or more accessible to citizens. The other options are incorrect because: "demolish" means to destroy, "ignore" means to disregard, and "complicate" means to make more difficult—none of which align with the positive intent of improving efficiency.',
    hint: "Think about what governments typically want to do with public services. The correct word should have a positive connotation related to improvement.",
    tags: ["vocabulary", "sentence-completion", "context-clues"],
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "q3",
    category: "general-information",
    difficulty: "medium",
    text: "Which article of the 1987 Philippine Constitution defines the Bill of Rights?",
    options: [
      { id: "q3-a", label: "A", text: "Article II" },
      { id: "q3-b", label: "B", text: "Article III" },
      { id: "q3-c", label: "C", text: "Article IV" },
      { id: "q3-d", label: "D", text: "Article V" },
    ],
    correctAnswerId: "q3-b",
    explanation:
      "Article III of the 1987 Philippine Constitution is the Bill of Rights. It contains 22 sections that enumerate the fundamental rights of Filipino citizens, including freedom of speech, freedom of religion, right to due process, right against unreasonable searches and seizures, and many other civil liberties. Article II covers the Declaration of Principles and State Policies, Article IV covers Citizenship, and Article V covers Suffrage.",
    hint: "The Bill of Rights comes early in the Constitution's structure, right after the Declaration of Principles.",
    tags: ["constitution", "bill-of-rights", "philippine-government"],
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "q4",
    category: "analytical-ability",
    difficulty: "hard",
    text: "If all roses are flowers, and some flowers fade quickly, which of the following statements must be true?",
    options: [
      { id: "q4-a", label: "A", text: "All roses fade quickly" },
      { id: "q4-b", label: "B", text: "Some roses fade quickly" },
      { id: "q4-c", label: "C", text: "No roses fade quickly" },
      { id: "q4-d", label: "D", text: "None of the above can be concluded" },
    ],
    correctAnswerId: "q4-d",
    explanation:
      'This is a syllogism problem. We know: (1) All roses are flowers, and (2) Some flowers fade quickly. From these premises, we cannot definitively conclude anything about roses fading quickly. The flowers that fade quickly might or might not include roses—we simply don\'t have enough information. This is a common logical fallacy trap. Just because roses are a subset of flowers, and some flowers have a property, doesn\'t mean roses necessarily have or don\'t have that property.',
    hint: 'Draw a Venn diagram. Roses are inside the "flowers" circle. The "fade quickly" group overlaps with some flowers, but we don\'t know if it overlaps with roses.',
    tags: ["logic", "syllogism", "deductive-reasoning"],
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "q5",
    category: "numerical-reasoning",
    difficulty: "easy",
    text: "A clerk can process 45 documents per hour. How many documents can 3 clerks process in 5 hours?",
    options: [
      { id: "q5-a", label: "A", text: "225 documents" },
      { id: "q5-b", label: "B", text: "450 documents" },
      { id: "q5-c", label: "C", text: "675 documents" },
      { id: "q5-d", label: "D", text: "135 documents" },
    ],
    correctAnswerId: "q5-c",
    explanation:
      "This is a work rate problem. One clerk processes 45 documents per hour. Three clerks working together process: 45 × 3 = 135 documents per hour. In 5 hours, they process: 135 × 5 = 675 documents. The key is to multiply the individual rate by the number of workers, then multiply by the time.",
    hint: "First find how many documents 3 clerks can process in 1 hour, then multiply by 5 hours.",
    tags: ["work-rate", "multiplication", "basic-math"],
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "q6",
    category: "clerical-operations",
    difficulty: "medium",
    text: "Arrange the following words in alphabetical order: 1) Requisition, 2) Requirement, 3) Requisite, 4) Required",
    options: [
      { id: "q6-a", label: "A", text: "4, 2, 3, 1" },
      { id: "q6-b", label: "B", text: "2, 4, 3, 1" },
      { id: "q6-c", label: "C", text: "4, 2, 1, 3" },
      { id: "q6-d", label: "D", text: "2, 4, 1, 3" },
    ],
    correctAnswerId: "q6-a",
    explanation:
      'When alphabetizing, compare letter by letter: All words start with "Requi". The next letter differs: Required (r-e-d), Requirement (r-e-m-e-n-t), Requisite (s-i-t-e), Requisition (s-i-t-i-o-n). Comparing "red" vs "rem" vs "sit" vs "sition": d comes before m, and both come before s. So the order is: Required (4), Requirement (2), Requisite (3), Requisition (1).',
    hint: 'Focus on where the words first differ. All start with "Requi" - look at what comes after.',
    tags: ["alphabetizing", "clerical", "attention-to-detail"],
    createdAt: "2024-01-15T00:00:00Z",
  },
];

// Mock User Data
export const mockUser: User = {
  id: "user-1",
  firstName: "Maria",
  lastName: "Santos",
  email: "maria.santos@email.com",
  avatarUrl: undefined,
  examDate: "2025-03-16T08:00:00Z", // March 16, 2025 - typical CSE date
  subscriptionStatus: "season-pass",
  stats: {
    questionsAnswered: 342,
    correctAnswers: 267,
    accuracy: 78.07,
    streakDays: 12,
    totalStudyTimeMinutes: 1840,
    weakestCategory: "numerical-reasoning",
    strongestCategory: "verbal-reasoning",
  },
  progress: {
    currentSessionId: "session-1",
    lastQuestionId: "q3",
    questionsAttempted: ["q1", "q2", "q3"],
    flaggedQuestions: ["q1"],
  },
  createdAt: "2024-11-01T00:00:00Z",
};

// Mock Quiz Session
export const mockQuizSession: QuizSession = {
  id: "session-1",
  userId: "user-1",
  mode: "practice",
  category: "numerical-reasoning",
  questions: mockQuestions,
  answers: [
    {
      questionId: "q1",
      selectedOptionId: "q1-b",
      status: "correct",
      timeSpentSeconds: 120,
      isFlagged: true,
    },
    {
      questionId: "q2",
      selectedOptionId: "q2-a",
      status: "correct",
      timeSpentSeconds: 45,
      isFlagged: false,
    },
  ],
  currentQuestionIndex: 2,
  startedAt: "2024-12-15T14:30:00Z",
};

// Mock Category Performance
export const mockCategoryPerformance: CategoryPerformance[] = [
  {
    category: "numerical-reasoning",
    totalQuestions: 120,
    correctAnswers: 84,
    accuracy: 70,
    averageTimeSeconds: 95,
  },
  {
    category: "verbal-reasoning",
    totalQuestions: 95,
    correctAnswers: 82,
    accuracy: 86.3,
    averageTimeSeconds: 45,
  },
  {
    category: "analytical-ability",
    totalQuestions: 67,
    correctAnswers: 52,
    accuracy: 77.6,
    averageTimeSeconds: 110,
  },
  {
    category: "general-information",
    totalQuestions: 45,
    correctAnswers: 36,
    accuracy: 80,
    averageTimeSeconds: 30,
  },
  {
    category: "clerical-operations",
    totalQuestions: 15,
    correctAnswers: 13,
    accuracy: 86.7,
    averageTimeSeconds: 55,
  },
];

// Mock Daily Progress (last 7 days)
export const mockDailyProgress: DailyProgress[] = [
  { date: "2024-12-09", questionsAnswered: 25, correctAnswers: 19, studyTimeMinutes: 45 },
  { date: "2024-12-10", questionsAnswered: 30, correctAnswers: 24, studyTimeMinutes: 55 },
  { date: "2024-12-11", questionsAnswered: 20, correctAnswers: 16, studyTimeMinutes: 35 },
  { date: "2024-12-12", questionsAnswered: 40, correctAnswers: 32, studyTimeMinutes: 70 },
  { date: "2024-12-13", questionsAnswered: 35, correctAnswers: 28, studyTimeMinutes: 60 },
  { date: "2024-12-14", questionsAnswered: 28, correctAnswers: 23, studyTimeMinutes: 50 },
  { date: "2024-12-15", questionsAnswered: 22, correctAnswers: 18, studyTimeMinutes: 40 },
];

// Helper function to get a question by ID
export function getQuestionById(id: string): Question | undefined {
  return mockQuestions.find((q) => q.id === id);
}

// Helper function to get questions by category
export function getQuestionsByCategory(category: string): Question[] {
  return mockQuestions.filter((q) => q.category === category);
}

// Helper function to calculate days until exam
export function getDaysUntilExam(examDate: string): number {
  const exam = new Date(examDate);
  const today = new Date();
  const diffTime = exam.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

// Helper function to format study time
export function formatStudyTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}
