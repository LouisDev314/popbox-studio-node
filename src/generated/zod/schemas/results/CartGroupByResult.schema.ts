import * as z from 'zod';
export const CartGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    updatedAt: z.number(),
    user: z.number(),
    items: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));