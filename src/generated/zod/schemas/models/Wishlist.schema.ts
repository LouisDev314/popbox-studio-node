import * as z from 'zod';

export const WishlistSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type WishlistType = z.infer<typeof WishlistSchema>;
