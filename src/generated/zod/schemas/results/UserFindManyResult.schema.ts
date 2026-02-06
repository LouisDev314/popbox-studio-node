import * as z from 'zod';
export const UserFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});