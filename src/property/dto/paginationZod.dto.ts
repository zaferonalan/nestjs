import z from 'zod';

export const paginationZodSchema = z.object({
    limit: z
        .string()
        .optional()
        .default('10')
        .transform((val) => (val ? parseInt(val, 10) : 10))
        .pipe(z.number().min(1).max(100)),
    skip: z
        .string()
        .optional()
        .default('0')
        .transform((val) => (val ? parseInt(val, 10) : 0))
        .pipe(z.number().min(0)),
});

// export const paginationZodSchema = z.object({
//     limit: z
//         .string()
//         .optional()
//         .transform((val) => (val ? parseInt(val, 10) : undefined))
//         .refine((val) => val === undefined || val > 0, {
//             message: 'limit must be a positive number',
//         }),
//     skip: z
//         .string()
//         .optional() //! alan zorunlu değil
//         .transform((val) => (val ? parseInt(val, 10) : undefined)) //! optional kullanıldığı için undefined gelebiliyor
//         .refine((val) => val === undefined || val > 0, {
//             //! burada da pozitif ve unefined gelme durumunu değerlendirdik
//             message: 'skip must be a possitive number',
//         }),
// });

export type PaginationZodDto = z.infer<typeof paginationZodSchema>;
