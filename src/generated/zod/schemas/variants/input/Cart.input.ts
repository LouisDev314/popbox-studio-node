import * as z from 'zod';
// prettier-ignore
export const CartInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    updatedAt: z.date().optional().nullable(),
    user: z.unknown(),
    items: z.array(z.unknown())
}).strict();

export type CartInputType = z.infer<typeof CartInputSchema>;
