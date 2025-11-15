import { z } from 'zod';

export const getUserProfileSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    avatarUrl: z.url().optional(),
});

export type UserProfileDto = z.infer<typeof getUserProfileSchema>;
