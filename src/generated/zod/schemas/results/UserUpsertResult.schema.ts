import * as z from 'zod';
export const UserUpsertResultSchema = z.object({
  id: z.string(),
  supabaseUserId: z.string(),
  email: z.string(),
  name: z.string().optional(),
  role: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
  wishlist: z.unknown().optional(),
  cart: z.unknown().optional(),
  orders: z.array(z.unknown()),
  orderStatusHistories: z.array(z.unknown())
});