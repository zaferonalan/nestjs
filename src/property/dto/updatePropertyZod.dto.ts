import z from 'zod';
import { createPropertySchema } from './createPropertyZod.tdo';

export const updatePropertySchema = createPropertySchema.partial();

export type updatePropertyZodDto = z.infer<typeof updatePropertySchema>;
