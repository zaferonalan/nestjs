import z from 'zod';

export const authenticatedRequestSchema = z.object({
    user: z.object({
        id: z.number(),
    }),
});

export type AuthenticatedRequestZodDto = z.infer<typeof authenticatedRequestSchema>;
