import * as z from 'zod';
export const CartUpsertResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  updatedAt: z.date().optional(),
  user: z.unknown(),
  items: z.array(z.unknown())
});