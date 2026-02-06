import * as z from 'zod';
// prettier-ignore
export const WishlistItemResultSchema = z.object({
    id: z.string(),
    wishlistId: z.string(),
    productId: z.string(),
    createdAt: z.date(),
    wishlist: z.unknown(),
    product: z.unknown()
}).strict();

export type WishlistItemResultType = z.infer<typeof WishlistItemResultSchema>;
