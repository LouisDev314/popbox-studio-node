import * as z from 'zod';
// prettier-ignore
export const WishlistModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.unknown(),
    items: z.array(z.unknown())
}).strict();

export type WishlistPureType = z.infer<typeof WishlistModelSchema>;
