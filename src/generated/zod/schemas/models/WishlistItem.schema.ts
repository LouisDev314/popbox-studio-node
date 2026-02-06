import * as z from 'zod';

export const WishlistItemSchema = z.object({
  id: z.string(),
  wishlistId: z.string(),
  productId: z.string(),
  createdAt: z.date(),
});

export type WishlistItemType = z.infer<typeof WishlistItemSchema>;
