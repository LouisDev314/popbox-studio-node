import * as z from 'zod';
// prettier-ignore
export const CartModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    updatedAt: z.date().nullable(),
    user: z.unknown(),
    items: z.array(z.unknown())
}).strict();

export type CartPureType = z.infer<typeof CartModelSchema>;
