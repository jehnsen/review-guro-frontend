import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/config/database";
import { withAuth, getAuthUser, AuthenticatedRequest } from "@/server/middlewares/withAuth";

// Combined dashboard data endpoint - returns all data needed for dashboard in one call
export const GET = withAuth(async (request: AuthenticatedRequest) => {
  try {
    const user = getAuthUser(request);
    const userId = user.userId;

    // Fetch all required data in parallel
    const [
      userProfile,
      progressByCategories,
      firstQuestions,
      userStats,
    ] = await Promise.all([
      // Get user profile with exam date
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          examDate: true,
        },
      }),

      // Get progress by categories - fetch from existing internal logic
      (async () => {
        const categories = await Promise.all(
          ['VERBAL_ABILITY', 'NUMERICAL_ABILITY', 'ANALYTICAL_ABILITY', 'GENERAL_INFORMATION', 'CLERICAL_ABILITY'].map(async (category) => {
            const totalQuestions = await prisma.question.count({ where: { category } });

            const userProgress = await prisma.userProgress.groupBy({
              by: ['questionId'],
              where: {
                userId,
                question: { category },
              },
              _count: { id: true },
            });

            const attemptedQuestions = userProgress.length;

            const correctAnswers = await prisma.userProgress.count({
              where: {
                userId,
                isCorrect: true,
                question: { category },
              },
            });

            const accuracy = attemptedQuestions > 0 ? (correctAnswers / attemptedQuestions) * 100 : 0;
            const questionsAvailable = totalQuestions - attemptedQuestions;

            return {
              category,
              totalQuestions,
              attemptedQuestions,
              correctAnswers,
              accuracy,
              questionsAvailable,
            };
          })
        );
        return categories;
      })(),

      // Get first question ID for each category
      Promise.all([
        prisma.question.findFirst({
          where: { category: "NUMERICAL_ABILITY" },
          select: { id: true, category: true },
          orderBy: { createdAt: "asc" },
        }),
        prisma.question.findFirst({
          where: { category: "VERBAL_ABILITY" },
          select: { id: true, category: true },
          orderBy: { createdAt: "asc" },
        }),
        prisma.question.findFirst({
          where: { category: "ANALYTICAL_ABILITY" },
          select: { id: true, category: true },
          orderBy: { createdAt: "asc" },
        }),
        prisma.question.findFirst({
          where: { category: "GENERAL_INFORMATION" },
          select: { id: true, category: true },
          orderBy: { createdAt: "asc" },
        }),
        prisma.question.findFirst({
          where: { category: "CLERICAL_ABILITY" },
          select: { id: true, category: true },
          orderBy: { createdAt: "asc" },
        }),
      ]),

      // Get overall user stats
      prisma.userProgress.aggregate({
        where: { userId },
        _count: { id: true },
      }),
    ]);

    // Calculate overall stats from UserProgress
    const totalAttempts = userStats._count.id || 0;

    // Get correct answers count separately
    const correctCount = await prisma.userProgress.count({
      where: {
        userId,
        isCorrect: true,
      },
    });

    const correctAnswers = correctCount || 0;
    const accuracy = totalAttempts > 0 ? (correctAnswers / totalAttempts) * 100 : 0;

    // Format category progress (data is already in correct format)
    const categories = progressByCategories;

    // Format first questions map
    const categoryQuestions: Record<string, string | null> = {
      NUMERICAL_ABILITY: null,
      VERBAL_ABILITY: null,
      ANALYTICAL_ABILITY: null,
      GENERAL_INFORMATION: null,
      CLERICAL_ABILITY: null,
    };

    firstQuestions.forEach((question) => {
      if (question) {
        categoryQuestions[question.category] = question.id;
      }
    });

    return NextResponse.json({
      success: true,
      message: "Dashboard data retrieved successfully",
      data: {
        profile: userProfile,
        stats: {
          totalAttempts,
          correctAnswers,
          accuracy,
        },
        categoryProgress: {
          categories,
          overallStats: {
            totalAttempts,
            correctAnswers,
            accuracy,
          },
        },
        categoryQuestions,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);

    // Log detailed error information
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard data",
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
});
