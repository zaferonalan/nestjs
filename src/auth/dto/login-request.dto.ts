import { Request } from 'express';
import z from 'zod';

export const authenticatedRequestSchema = z.object({
    user: z.object({
        id: z.number(),
    }),
});

export type AuthenticatedRequestZodDto = Request & z.infer<typeof authenticatedRequestSchema>;
