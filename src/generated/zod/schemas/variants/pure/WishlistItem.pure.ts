import * as z from 'zod';
// prettier-ignore
export const WishlistItemModelSchema = z.object({
    id: z.string(),
    wishlistId: z.string(),
    productId: z.string(),
    createdAt: z.date(),
    wishlist: z.unknown(),
    product: z.unknown()
}).strict();

export type WishlistItemPureType = z.infer<typeof WishlistItemModelSchema>;
