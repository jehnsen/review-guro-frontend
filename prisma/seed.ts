/**
 * Database Seed Script
 * Populates the database with sample civil service exam questions
 */

import { PrismaClient, QuestionCategory, Difficulty } from '@prisma/client';

const prisma = new PrismaClient();

const sampleQuestions = [
  // VERBAL ABILITY - EASY
  {
    category: QuestionCategory.VERBAL_ABILITY,
    difficulty: Difficulty.EASY,
    questionText: 'Choose the word that is most similar in meaning to "BENEVOLENT".',
    options: [
      { id: 'opt-1', text: 'Hostile' },
      { id: 'opt-2', text: 'Kind' },
      { id: 'opt-3', text: 'Indifferent' },
      { id: 'opt-4', text: 'Cruel' },
    ],
    correctOptionId: 'opt-2',
    explanationText: 'Benevolent means kind and generous. The most similar word is "Kind".',
    hint: 'Think about the root "bene" which means "good" or "well".',
    tags: ['vocabulary', 'synonyms'],
  },
  {
    category: QuestionCategory.VERBAL_ABILITY,
    difficulty: Difficulty.EASY,
    questionText: 'Identify the correctly spelled word:',
    options: [
      { id: 'opt-1', text: 'Occassion' },
      { id: 'opt-2', text: 'Occasion' },
      { id: 'opt-3', text: 'Ocasion' },
      { id: 'opt-4', text: 'Occation' },
    ],
    correctOptionId: 'opt-2',
    explanationText: 'The correct spelling is "Occasion" with two "c"s and one "s".',
    hint: 'Remember: double C, single S.',
    tags: ['spelling', 'grammar'],
  },

  // NUMERICAL ABILITY - EASY
  {
    category: QuestionCategory.NUMERICAL_ABILITY,
    difficulty: Difficulty.EASY,
    questionText: 'What is 15% of 200?',
    options: [
      { id: 'opt-1', text: '25' },
      { id: 'opt-2', text: '30' },
      { id: 'opt-3', text: '35' },
      { id: 'opt-4', text: '40' },
    ],
    correctOptionId: 'opt-2',
    explanationText: '15% of 200 = (15/100) × 200 = 0.15 × 200 = 30',
    hint: 'Convert percentage to decimal by dividing by 100.',
    tags: ['percentage', 'basic math'],
  },
  {
    category: QuestionCategory.NUMERICAL_ABILITY,
    difficulty: Difficulty.MEDIUM,
    questionText: 'If a product costs ₱500 and is discounted by 20%, what is the sale price?',
    options: [
      { id: 'opt-1', text: '₱300' },
      { id: 'opt-2', text: '₱350' },
      { id: 'opt-3', text: '₱400' },
      { id: 'opt-4', text: '₱450' },
    ],
    correctOptionId: 'opt-3',
    explanationText: 'Discount = 20% of ₱500 = ₱100. Sale price = ₱500 - ₱100 = ₱400',
    hint: 'First calculate the discount amount, then subtract from original price.',
    tags: ['percentage', 'discount', 'word problem'],
  },

  // ANALYTICAL ABILITY - EASY
  {
    category: QuestionCategory.ANALYTICAL_ABILITY,
    difficulty: Difficulty.EASY,
    questionText: 'Complete the sequence: 2, 4, 6, 8, __',
    options: [
      { id: 'opt-1', text: '9' },
      { id: 'opt-2', text: '10' },
      { id: 'opt-3', text: '11' },
      { id: 'opt-4', text: '12' },
    ],
    correctOptionId: 'opt-2',
    explanationText: 'This is a sequence of even numbers increasing by 2. The next number is 10.',
    hint: 'Look for the pattern. What is common among all numbers?',
    tags: ['number series', 'patterns'],
  },
  {
    category: QuestionCategory.ANALYTICAL_ABILITY,
    difficulty: Difficulty.MEDIUM,
    questionText: 'If all roses are flowers and some flowers are red, which statement must be true?',
    options: [
      { id: 'opt-1', text: 'All roses are red' },
      { id: 'opt-2', text: 'Some roses are red' },
      { id: 'opt-3', text: 'All flowers are roses' },
      { id: 'opt-4', text: 'None of the above must be true' },
    ],
    correctOptionId: 'opt-4',
    explanationText: 'We cannot conclude any of the first three statements with certainty from the given information.',
    hint: 'Focus on what MUST be true, not what COULD be true.',
    tags: ['logic', 'deductive reasoning'],
  },

  // GENERAL INFORMATION - EASY
  {
    category: QuestionCategory.GENERAL_INFORMATION,
    difficulty: Difficulty.EASY,
    questionText: 'Who is the national hero of the Philippines?',
    options: [
      { id: 'opt-1', text: 'Andres Bonifacio' },
      { id: 'opt-2', text: 'Jose Rizal' },
      { id: 'opt-3', text: 'Emilio Aguinaldo' },
      { id: 'opt-4', text: 'Apolinario Mabini' },
    ],
    correctOptionId: 'opt-2',
    explanationText: 'Dr. Jose Rizal is recognized as the national hero of the Philippines for his peaceful advocacy for reforms.',
    hint: 'He wrote Noli Me Tangere and El Filibusterismo.',
    tags: ['philippine history', 'national heroes'],
  },
  {
    category: QuestionCategory.GENERAL_INFORMATION,
    difficulty: Difficulty.MEDIUM,
    questionText: 'What is the capital city of the Philippines?',
    options: [
      { id: 'opt-1', text: 'Quezon City' },
      { id: 'opt-2', text: 'Manila' },
      { id: 'opt-3', text: 'Cebu City' },
      { id: 'opt-4', text: 'Davao City' },
    ],
    correctOptionId: 'opt-2',
    explanationText: 'Manila is the capital city of the Philippines, though Quezon City was the capital from 1948-1976.',
    hint: 'It is located in Metro Manila and is the most densely populated city.',
    tags: ['geography', 'philippines'],
  },

  // CLERICAL ABILITY - EASY
  {
    category: QuestionCategory.CLERICAL_ABILITY,
    difficulty: Difficulty.EASY,
    questionText: 'Arrange the following names in alphabetical order: Cruz, Bautista, Dela Cruz, Aquino',
    options: [
      { id: 'opt-1', text: 'Aquino, Bautista, Cruz, Dela Cruz' },
      { id: 'opt-2', text: 'Aquino, Bautista, Dela Cruz, Cruz' },
      { id: 'opt-3', text: 'Bautista, Aquino, Cruz, Dela Cruz' },
      { id: 'opt-4', text: 'Cruz, Dela Cruz, Bautista, Aquino' },
    ],
    correctOptionId: 'opt-1',
    explanationText: 'In alphabetical order: Aquino, Bautista, Cruz, Dela Cruz. "D" comes after "C".',
    hint: 'Compare the first letters. If they are the same, compare the second letter.',
    tags: ['alphabetizing', 'filing'],
  },
  {
    category: QuestionCategory.CLERICAL_ABILITY,
    difficulty: Difficulty.MEDIUM,
    questionText: 'Find the error in this address: 123 Main St., Quezon City, Metro Manilla, 1100',
    options: [
      { id: 'opt-1', text: 'Incorrect street number' },
      { id: 'opt-2', text: 'Misspelled "Manilla"' },
      { id: 'opt-3', text: 'Incorrect ZIP code' },
      { id: 'opt-4', text: 'No error' },
    ],
    correctOptionId: 'opt-2',
    explanationText: 'The correct spelling is "Manila" with one "L", not "Manilla".',
    hint: 'Check each word carefully for spelling errors.',
    tags: ['proofreading', 'attention to detail'],
  },

  // HARDER QUESTIONS
  {
    category: QuestionCategory.NUMERICAL_ABILITY,
    difficulty: Difficulty.HARD,
    questionText: 'A train travels 120 km in 2 hours. If it increases its speed by 20%, how long will it take to travel 180 km?',
    options: [
      { id: 'opt-1', text: '2 hours' },
      { id: 'opt-2', text: '2.5 hours' },
      { id: 'opt-3', text: '3 hours' },
      { id: 'opt-4', text: '3.5 hours' },
    ],
    correctOptionId: 'opt-2',
    explanationText: 'Original speed = 120km/2h = 60 km/h. New speed = 60 + (20% of 60) = 72 km/h. Time = 180/72 = 2.5 hours.',
    hint: 'First find the original speed, then calculate new speed, finally divide distance by new speed.',
    tags: ['speed distance time', 'percentage increase'],
  },
  {
    category: QuestionCategory.ANALYTICAL_ABILITY,
    difficulty: Difficulty.HARD,
    questionText: 'In a certain code, COMPUTER is written as DPNQVUFS. How is KEYBOARD written in that code?',
    options: [
      { id: 'opt-1', text: 'LFZCPBSE' },
      { id: 'opt-2', text: 'LFZCPBSD' },
      { id: 'opt-3', text: 'KEZBOARD' },
      { id: 'opt-4', text: 'KFZCPBSE' },
    ],
    correctOptionId: 'opt-1',
    explanationText: 'Each letter is shifted one position forward in the alphabet. K→L, E→F, Y→Z, B→C, O→P, A→B, R→S, D→E.',
    hint: 'Compare corresponding letters in COMPUTER and DPNQVUFS to find the pattern.',
    tags: ['coding-decoding', 'cipher'],
  },
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data (optional - comment out if you want to preserve existing data)
  console.log('🗑️  Clearing existing questions...');
  await prisma.question.deleteMany({});

  console.log('📝 Creating sample questions...');

  for (const question of sampleQuestions) {
    await prisma.question.create({
      data: {
        category: question.category,
        difficulty: question.difficulty,
        questionText: question.questionText,
        options: question.options,
        correctOptionId: question.correctOptionId,
        explanationText: question.explanationText,
        hint: question.hint,
        tags: question.tags,
      },
    });
  }

  console.log(`✅ Created ${sampleQuestions.length} sample questions`);

  // Create a test user
  const bcrypt = await import('bcryptjs');
  const hashedPassword = await bcrypt.hash('TestPass123', 10);

  const existingUser = await prisma.user.findUnique({
    where: { email: 'test@reviewguro.com' },
  });

  if (!existingUser) {
    const testUser = await prisma.user.create({
      data: {
        email: 'test@reviewguro.com',
        password: hashedPassword,
        firstName: 'Test',
        lastName: 'User',
        subscription: {
          create: {
            status: 'FREE',
            plan: 'FREE',
          },
        },
      },
    });

    console.log('👤 Created test user:');
    console.log('   Email: test@reviewguro.com');
    console.log('   Password: TestPass123');
    console.log(`   ID: ${testUser.id}`);
  } else {
    console.log('👤 Test user already exists (test@reviewguro.com)');
  }

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - ${sampleQuestions.length} questions created`);
  console.log(`   - Breakdown by category:`);

  const categoryCounts = await prisma.question.groupBy({
    by: ['category'],
    _count: { id: true },
  });

  categoryCounts.forEach((cat) => {
    console.log(`     • ${cat.category}: ${cat._count.id} questions`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
