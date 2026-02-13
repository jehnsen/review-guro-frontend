/**
 * Seed Script: Generate Questionnaires from Existing Questions
 *
 * This script creates 7 questionnaire templates based on the existing
 * questionnaireNumber field (1-7) in the questions table.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting questionnaire generation...\n');

  // Define questionnaire templates
  const questionnaireTemplates = [
    {
      number: 1,
      title: 'Civil Service Examination - Professional Level Set 1',
      description: 'First set of practice questions for CSE Professional level examination',
      isActive: true,
      timeLimit: 120,
      passingScore: 80,
    },
    {
      number: 2,
      title: 'Civil Service Examination - Professional Level Set 2',
      description: 'Second set of practice questions for CSE Professional level examination',
      isActive: true,
      timeLimit: 120,
      passingScore: 80,
    },
    {
      number: 3,
      title: 'Civil Service Examination - Professional Level Set 3',
      description: 'Third set of practice questions for CSE Professional level examination',
      isActive: true,
      timeLimit: 120,
      passingScore: 80,
    },
    {
      number: 4,
      title: 'Civil Service Examination - Professional Level Set 4',
      description: 'Fourth set of practice questions for CSE Professional level examination',
      isActive: true,
      timeLimit: 120,
      passingScore: 80,
    },
    {
      number: 5,
      title: 'Civil Service Examination - Professional Level Set 5',
      description: 'Fifth set of practice questions for CSE Professional level examination',
      isActive: true,
      timeLimit: 120,
      passingScore: 80,
    },
    {
      number: 6,
      title: 'Civil Service Examination - Professional Level Set 6',
      description: 'Sixth set of practice questions for CSE Professional level examination',
      isActive: true,
      timeLimit: 120,
      passingScore: 80,
    },
    {
      number: 7,
      title: 'Civil Service Examination - Professional Level Set 7',
      description: 'Seventh set of practice questions for CSE Professional level examination',
      isActive: true,
      timeLimit: 120,
      passingScore: 80,
    },
  ];

  // Create questionnaires and associate questions
  for (const template of questionnaireTemplates) {
    console.log(`📝 Processing Questionnaire #${template.number}...`);

    // Check if questionnaire already exists
    const existing = await prisma.questionnaire.findUnique({
      where: { number: template.number },
    });

    if (existing) {
      console.log(`   ⚠️  Questionnaire #${template.number} already exists, skipping...`);
      continue;
    }

    // Get all questions for this questionnaire number
    const questions = await prisma.question.findMany({
      where: { questionnaireNumber: template.number },
      orderBy: { createdAt: 'asc' },
    });

    console.log(`   📊 Found ${questions.length} questions`);

    if (questions.length === 0) {
      console.log(`   ⚠️  No questions found for questionnaire #${template.number}, skipping...`);
      continue;
    }

    // Create questionnaire with questions
    const questionnaire = await prisma.questionnaire.create({
      data: {
        ...template,
        totalQuestions: questions.length,
        questions: {
          create: questions.map((question, index) => ({
            questionId: question.id,
            order: index + 1,
          })),
        },
      },
    });

    console.log(`   ✅ Created questionnaire "${questionnaire.title}" with ${questions.length} questions\n`);
  }

  // Summary
  console.log('📊 Summary:');
  const totalQuestionnaires = await prisma.questionnaire.count();
  const totalAssignments = await prisma.questionnaireQuestion.count();

  console.log(`   Total Questionnaires: ${totalQuestionnaires}`);
  console.log(`   Total Question Assignments: ${totalAssignments}`);

  // Show distribution
  console.log('\n📈 Questionnaire Distribution:');
  const questionnaires = await prisma.questionnaire.findMany({
    orderBy: { number: 'asc' },
    include: {
      _count: {
        select: { questions: true },
      },
    },
  });

  questionnaires.forEach(q => {
    console.log(`   Q${q.number}: ${q._count.questions} questions - "${q.title}"`);
  });

  console.log('\n✅ Questionnaire generation completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
