/**
 * AI Service
 * Handles AI-powered explanations and tutor chat for questions
 * Uses OpenAI API for generating contextual responses
 */

import OpenAI from 'openai';
import { Question } from '@prisma/client';
import { config } from '../config/env';

interface AIExplanationResult {
  explanation: string;
  tokensUsed: number;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatResult {
  reply: string;
  tokensUsed: number;
}

class AIService {
  private readonly client: OpenAI | null;
  private readonly isConfigured: boolean;

  /**
   * Maximum number of conversation history messages to send to OpenAI.
   * Limits token usage by keeping only the most recent messages (3 turns).
   * This prevents exponential token costs in long conversations.
   */
  private readonly MAX_HISTORY_MESSAGES = 6;

  constructor() {
    this.isConfigured = Boolean(config.openai.apiKey);
    this.client = this.isConfigured
      ? new OpenAI({ apiKey: config.openai.apiKey })
      : null;
  }

  /**
   * Generate AI-powered explanation for a question
   */
  async generateExplanation(question: Question): Promise<AIExplanationResult> {
    if (!this.client) {
      return this.generateMockExplanation(question);
    }

    try {
      const options = this.parseOptions(question.options);
      const correctOption = options.find(o => o.id === question.correctOptionId);

      const response = await this.client.chat.completions.create({
        model: config.openai.model,
        max_tokens: config.openai.maxTokens,
        messages: [
          {
            role: 'system',
            content: `You are a helpful exam tutor for Philippine Civil Service Exam preparation. Explain answers clearly and concisely. Keep explanations focused and educational.

Formatting rules:
- Use **bold** for emphasis and key terms
- Use plain text for math (e.g. "3 × 2/5 = 6/5 = 1.2 kg"), NEVER use LaTeX notation like \\frac, \\times, \\text, \\[ or \\]
- Use numbered lists for step-by-step solutions
- Use bullet points for tips`,
          },
          {
            role: 'user',
            content: `Explain this ${question.category.replace(/_/g, ' ').toLowerCase()} question:

Question: ${question.questionText}

Options:
${options.map(o => `- ${o.text}`).join('\n')}

Correct Answer: ${correctOption?.text || 'N/A'}

Provide a clear explanation of why the correct answer is right and why the other options are wrong. Include tips for similar questions.`,
          },
        ],
      });

      const explanation = response.choices[0]?.message?.content || '';
      return {
        explanation,
        tokensUsed: response.usage?.total_tokens || 0,
      };
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      console.error(`[AI Tutor] OpenAI explanation failed: ${errMsg}`);
      if (errMsg.includes('Incorrect API key') || errMsg.includes('invalid_api_key')) {
        console.error('[AI Tutor] Your OPENAI_API_KEY is invalid. Get a new key at https://platform.openai.com/api-keys');
      }
      return this.generateMockExplanation(question);
    }
  }

  /**
   * Chat with AI tutor about a specific question
   * Supports multi-turn conversation with question context
   */
  async chat(
    question: Question,
    userMessage: string,
    conversationHistory: ChatMessage[]
  ): Promise<AIChatResult> {
    if (!this.client) {
      return this.generateMockChatReply(question, userMessage);
    }

    try {
      const options = this.parseOptions(question.options);
      const correctOption = options.find(o => o.id === question.correctOptionId);

      // OPTIMIZATION: Limit conversation history to prevent token bleed.
      // Only keep the last N messages (3 turns) to avoid exponential token costs.
      // The AI doesn't need full conversation context for question-specific tutoring.
      const recentHistory = conversationHistory.slice(-this.MAX_HISTORY_MESSAGES);

      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: `You are an AI tutor helping a student prepare for the Philippine Civil Service Exam. You are discussing a specific question with them.

Question: ${question.questionText}
Category: ${question.category.replace(/_/g, ' ')}
Options:
${options.map(o => `- ${o.text}`).join('\n')}
Correct Answer: ${correctOption?.text || 'N/A'}
${question.explanationText ? `Explanation: ${question.explanationText}` : ''}

Instructions:
- Be helpful, encouraging, and concise
- Answer the student's follow-up questions about this specific question
- If they ask you to explain differently, use analogies or simpler language
- If they ask for tips, give practical exam-taking strategies
- Keep responses under 200 words unless they ask for more detail
- Use **bold** for emphasis, numbered lists for steps, bullet points for tips
- For math, use plain text (e.g. "3 × 2/5 = 6/5 = 1.2 kg"), NEVER use LaTeX notation like \\frac, \\times, \\text, \\[ or \\]`,
        },
        // Include only recent conversation history (last 6 messages)
        ...recentHistory.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        {
          role: 'user' as const,
          content: userMessage,
        },
      ];

      const response = await this.client.chat.completions.create({
        model: config.openai.model,
        max_tokens: config.openai.maxTokens,
        messages,
      });

      const reply = response.choices[0]?.message?.content || 'Sorry, I could not generate a response. Please try again.';
      return {
        reply,
        tokensUsed: response.usage?.total_tokens || 0,
      };
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      console.error(`[AI Tutor] OpenAI chat failed: ${errMsg}`);
      if (errMsg.includes('Incorrect API key') || errMsg.includes('invalid_api_key')) {
        console.error('[AI Tutor] Your OPENAI_API_KEY is invalid. Get a new key at https://platform.openai.com/api-keys');
      }
      return this.generateMockChatReply(question, userMessage);
    }
  }

  /**
   * Parse question options from JSON stored in DB
   */
  private parseOptions(options: unknown): { id: string; text: string }[] {
    if (typeof options === 'string') {
      try {
        return JSON.parse(options);
      } catch {
        return [];
      }
    }
    if (Array.isArray(options)) {
      return options as { id: string; text: string }[];
    }
    return [];
  }

  /**
   * Mock explanation fallback when OpenAI is not configured
   */
  private generateMockExplanation(question: Question): AIExplanationResult {
    const categoryExplanations: Record<string, string> = {
      VERBAL_ABILITY: `**Understanding the Question:**
This verbal ability question tests your comprehension and language skills.

**Step-by-Step Analysis:**
1. Carefully read the question and identify the key concepts.
2. Analyze each option and eliminate obviously incorrect choices.
3. Look for context clues within the question text.

**Tips for Similar Questions:**
- Read all options before answering
- Look for keywords that indicate the expected answer type
- Practice with similar question patterns`,

      NUMERICAL_ABILITY: `**Understanding the Problem:**
This numerical ability question tests your mathematical reasoning and calculation skills.

**Step-by-Step Solution:**
1. Identify what the question is asking for.
2. List the given information and any formulas needed.
3. Solve systematically, showing each step.

**Tips for Similar Problems:**
- Double-check your calculations
- Estimate the answer first to verify reasonableness
- Practice mental math for faster solving`,

      ANALYTICAL_ABILITY: `**Understanding the Question:**
This analytical ability question tests your logical reasoning and problem-solving skills.

**Analysis Approach:**
1. Identify the pattern or logical relationship.
2. Break down complex information into smaller parts.
3. Apply logical deduction to eliminate wrong answers.

**Tips for Similar Questions:**
- Draw diagrams or tables if helpful
- Work backwards from the options when stuck
- Practice identifying common logical patterns`,

      GENERAL_INFORMATION: `**Understanding the Question:**
This general information question tests your knowledge of facts, current events, or common knowledge.

**Key Information:**
This topic relates to Philippine history, government, geography, or general knowledge areas commonly covered in civil service exams.

**Tips for Similar Questions:**
- Stay updated with current events
- Review Philippine constitution and government structure
- Study historical events and important dates`,

      CLERICAL_ABILITY: `**Understanding the Question:**
This clerical ability question tests your attention to detail, accuracy, and organizational skills.

**Step-by-Step Approach:**
1. Carefully read and compare all given information.
2. Pay close attention to spelling, numbers, and sequences.
3. Double-check your answer against the original data.

**Tips for Similar Questions:**
- Take your time - accuracy matters more than speed
- Use your finger to track while comparing
- Practice with filing and coding exercises`,
    };

    const explanation =
      categoryExplanations[question.category] ||
      `**Explanation:**
This question tests your understanding of ${question.category.replace(/_/g, ' ').toLowerCase()}.

**Key Points:**
- Read the question carefully
- Analyze each option
- Eliminate obviously wrong answers
- Choose the most logical option`;

    return {
      explanation: `${explanation}

---
*This explanation was generated to help you understand the concept better. For the best preparation, practice with more questions in this category.*`,
      tokensUsed: 0,
    };
  }

  /**
   * Mock chat reply fallback when OpenAI is not configured or errors
   * Uses actual question content to provide relevant responses
   */
  private generateMockChatReply(question: Question, userMessage: string): AIChatResult {
    const lowerMsg = userMessage.toLowerCase();
    const options = this.parseOptions(question.options);
    const correctOption = options.find(o => o.id === question.correctOptionId);
    const correctText = correctOption?.text || 'the correct answer';
    const questionSnippet = question.questionText.length > 80
      ? question.questionText.substring(0, 80) + '...'
      : question.questionText;

    let reply: string;

    if (lowerMsg.includes('formula') || lowerMsg.includes('how') || lowerMsg.includes('solve') || lowerMsg.includes('calculate')) {
      reply = `For the question "${questionSnippet}":\n\nThe answer is **${correctText}**.\n\n${question.explanationText || `To solve this, break the problem into steps:\n1. Identify the key values given in the question\n2. Determine what operation is needed\n3. Calculate step by step\n4. Verify your answer matches one of the options`}`;
    } else if (lowerMsg.includes('explain') && lowerMsg.includes('different')) {
      reply = `Let me explain it differently!\n\nThe question asks: "${questionSnippet}"\n\nThe correct answer is **${correctText}**.\n\n${question.explanationText || 'Think about what the question is really asking. Focus on the key numbers or words, then work through it logically. The correct answer is the only one that satisfies all the conditions in the question.'}`;
    } else if (lowerMsg.includes('key concept') || lowerMsg.includes('main idea')) {
      reply = `The key concept here is **${question.category.replace(/_/g, ' ').toLowerCase()}**.\n\nFor this question, you need to understand:\n- What the question is asking: "${questionSnippet}"\n- Why **${correctText}** is correct\n${question.explanationText ? `\n${question.explanationText}` : '\nFocus on the relationship between the given information and the answer choices.'}`;
    } else if (lowerMsg.includes('tip') || lowerMsg.includes('similar')) {
      reply = `Tips for questions like "${questionSnippet}":\n\n1. **Identify the type** — This is a ${question.category.replace(/_/g, ' ').toLowerCase()} question\n2. **Find key info** — Look for the important numbers, words, or relationships\n3. **Eliminate wrong options** — Check each option against the question\n4. **Verify** — Make sure your answer (${correctText}) makes sense in context\n\nPractice more ${question.category.replace(/_/g, ' ').toLowerCase()} questions to build speed!`;
    } else if (lowerMsg.includes('why') || lowerMsg.includes('wrong') || lowerMsg.includes('incorrect')) {
      const wrongOptions = options.filter(o => o.id !== question.correctOptionId);
      reply = `The correct answer is **${correctText}**.\n\n${question.explanationText || 'Here\'s why the other options are wrong:'}\n\n${wrongOptions.map(o => `- **${o.text}** — This doesn't satisfy the conditions in the question`).join('\n')}`;
    } else {
      reply = `For this question: "${questionSnippet}"\n\nThe correct answer is **${correctText}**.\n\n${question.explanationText || 'The key is to carefully read what the question is asking and match it to the best option.'}\n\nWould you like me to explain any specific part in more detail?`;
    }

    return { reply, tokensUsed: 0 };
  }
}

export const aiService = new AIService();
