import * as z from 'zod';
export const UserGroupByResultSchema = z.array(z.object({
  id: z.string(),
  supabaseUserId: z.string(),
  email: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date(),
  _count: z.object({
    id: z.number(),
    supabaseUserId: z.number(),
    email: z.number(),
    name: z.number(),
    role: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    deletedAt: z.number(),
    wishlist: z.number(),
    cart: z.number(),
    orders: z.number(),
    orderStatusHistories: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    supabaseUserId: z.string().nullable(),
    email: z.string().nullable(),
    name: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    deletedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    supabaseUserId: z.string().nullable(),
    email: z.string().nullable(),
    name: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    deletedAt: z.date().nullable()
  }).nullable().optional()
}));