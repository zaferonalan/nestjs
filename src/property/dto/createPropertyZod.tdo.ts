import z from 'zod';

export const createPropertySchema = z
    .object({
        name: z.string(),
        description: z.string().min(10),
        price: z.number().positive(),
    })
    .required();

export type CreatePropertyZodDto = Readonly<z.infer<typeof createPropertySchema>>;
