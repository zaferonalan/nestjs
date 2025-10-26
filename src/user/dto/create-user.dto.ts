import z from 'zod';

export const createUserSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
    avatarUrl: z.url().optional().nullable().default(null),
    password: z.string(),
});

export type CreateUserZodDto = z.infer<typeof createUserSchema>;
