import * as z from 'zod';
export const WishlistItemDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  wishlistId: z.string(),
  productId: z.string(),
  createdAt: z.date(),
  wishlist: z.unknown(),
  product: z.unknown()
}));