/**
 * Database Seed Script
 * Populates the database with 7 questionnaires of civil service exam questions
 * Each questionnaire contains 170 questions across 5 categories
 */

import { PrismaClient } from '@prisma/client';
import { SeedQuestion } from './seeds/types';
import { questionnaire1 } from './seeds/questionnaire1';
import { questionnaire2 } from './seeds/questionnaire2';
import { questionnaire3 } from './seeds/questionnaire3';
import { questionnaire4 } from './seeds/questionnaire4';
import { questionnaire5 } from './seeds/questionnaire5';
import { questionnaire6 } from './seeds/questionnaire6';
import { questionnaire7 } from './seeds/questionnaire7';

const prisma = new PrismaClient();

const questionnaires: { number: number; questions: SeedQuestion[] }[] = [
  { number: 1, questions: questionnaire1 },
  { number: 2, questions: questionnaire2 },
  { number: 3, questions: questionnaire3 },
  { number: 4, questions: questionnaire4 },
  { number: 5, questions: questionnaire5 },
  { number: 6, questions: questionnaire6 },
  { number: 7, questions: questionnaire7 },
];

async function main() {
  console.log('🌱 Starting database seed...\n');

  let totalCreated = 0;

  for (const { number: qNum, questions } of questionnaires) {
    console.log(`📝 Seeding questionnaire #${qNum} (${questions.length} questions)...`);

    // Delete existing questions for this questionnaire number (idempotent re-seeding)
    const deleted = await prisma.question.deleteMany({
      where: { questionnaireNumber: qNum },
    });

    if (deleted.count > 0) {
      console.log(`   🗑️  Removed ${deleted.count} existing questions for questionnaire #${qNum}`);
    }

    // Batch create using createMany for performance
    const result = await prisma.question.createMany({
      data: questions.map((q) => ({
        category: q.category,
        difficulty: q.difficulty,
        questionText: q.questionText,
        options: q.options,
        correctOptionId: q.correctOptionId,
        explanationText: q.explanationText,
        questionnaireNumber: qNum,
      })),
    });

    console.log(`   ✅ Created ${result.count} questions`);
    totalCreated += result.count;
  }

  // Create a test user if not exists
  const bcryptModule = await import('bcryptjs');
  const bcrypt = bcryptModule.default || bcryptModule;
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
            planName: 'Free Plan',
            planPrice: 0,
            purchaseDate: new Date(),
            paymentMethod: 'none',
            amountPaid: 0,
            transactionId: 'free-tier',
          },
        },
      },
    });

    console.log('\n👤 Created test user:');
    console.log('   Email: test@reviewguro.com');
    console.log('   Password: TestPass123');
    console.log(`   ID: ${testUser.id}`);
  } else {
    console.log('\n👤 Test user already exists (test@reviewguro.com)');
  }

  // Print summary
  console.log('\n🎉 Seed completed successfully!');
  console.log(`\n📊 Summary: ${totalCreated} total questions created\n`);

  const summary = await prisma.question.groupBy({
    by: ['questionnaireNumber', 'category'],
    _count: { id: true },
    orderBy: [{ questionnaireNumber: 'asc' }, { category: 'asc' }],
  });

  let currentQNum = 0;
  for (const row of summary) {
    if (row.questionnaireNumber !== currentQNum) {
      currentQNum = row.questionnaireNumber;
      const total = summary
        .filter((r) => r.questionnaireNumber === currentQNum)
        .reduce((sum, r) => sum + r._count.id, 0);
      console.log(`\n   Questionnaire #${currentQNum} (${total} questions):`);
    }
    console.log(`     • ${row.category}: ${row._count.id}`);
  }

  // Difficulty breakdown
  const diffSummary = await prisma.question.groupBy({
    by: ['difficulty'],
    _count: { id: true },
    orderBy: { difficulty: 'asc' },
  });

  console.log('\n   Difficulty breakdown (all questionnaires):');
  for (const row of diffSummary) {
    console.log(`     • ${row.difficulty}: ${row._count.id}`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
