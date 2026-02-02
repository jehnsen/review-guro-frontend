/**
 * GET /api/users/profile - Get user profile
 * PATCH /api/users/profile - Update user profile
 */

import { withAuth, getAuthUser, AuthenticatedRequest } from '@/server/middlewares/withAuth';
import { userRepository } from '@/server/repositories/user.repository';
import { createSuccessResponse, createErrorResponse } from '@/server/utils/nextResponse';
import { z } from 'zod';

const updateProfileSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  examDate: z.string().datetime().optional(),
});

async function getHandler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);

    const user = await userRepository.findById(userId);

    if (!user) {
      return createErrorResponse(new Error('User not found'), 404);
    }

    const safeUser = userRepository.toSafeUser(user);

    return createSuccessResponse(safeUser, 'Profile retrieved successfully');
  } catch (error) {
    return createErrorResponse(error as Error);
  }
}

async function patchHandler(request: AuthenticatedRequest) {
  try {
    const { userId } = getAuthUser(request);
    const body = await request.json();

    // Validate input
    const validatedData = updateProfileSchema.parse(body);

    // Convert examDate string to Date if provided
    const updateData: {
      firstName?: string;
      lastName?: string;
      examDate?: Date;
    } = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      ...(validatedData.examDate && { examDate: new Date(validatedData.examDate) }),
    };

    // Update profile
    const updatedUser = await userRepository.updateProfile(userId, updateData);

    return createSuccessResponse(updatedUser, 'Profile updated successfully');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return createErrorResponse(
        new Error(error.errors[0]?.message || 'Validation failed'),
        400
      );
    }

    return createErrorResponse(error as Error);
  }
}

export const GET = withAuth(getHandler);
export const PATCH = withAuth(patchHandler);
