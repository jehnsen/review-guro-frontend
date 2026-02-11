import { QuestionCategory, Difficulty } from '@prisma/client';

export interface SeedQuestion {
  category: QuestionCategory;
  difficulty: Difficulty;
  questionText: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanationText: string;
}

export function q(
  category: QuestionCategory,
  difficulty: Difficulty,
  questionText: string,
  options: [string, string, string, string],
  correctIndex: number,
  explanationText: string
): SeedQuestion {
  const ids = ['A', 'B', 'C', 'D'];
  return {
    category,
    difficulty,
    questionText,
    options: options.map((text, i) => ({ id: ids[i], text })),
    correctOptionId: ids[correctIndex],
    explanationText,
  };
}
