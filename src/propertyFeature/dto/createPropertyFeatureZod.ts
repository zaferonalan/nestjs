import z, { int } from 'zod';

export const createPropertyFeatureSchema = z
    .object({
        bedrooms: z.int().positive(),
        bathrooms: z.int().min(0),
        parkingSpots: z.int().min(0),
        area: z.number().positive(),
        hasSwimmingPool: z.boolean(),
        hasGardenYard: z.boolean(),
        hasBalcony: z.boolean(),
    })
    .required();

export type createPropertyFeatureDto = z.infer<typeof createPropertyFeatureSchema>;
