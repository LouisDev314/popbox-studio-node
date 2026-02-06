import * as z from 'zod';
export const ProductFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  vendor: z.string().optional(),
  categoryId: z.string(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  category: z.unknown(),
  variants: z.array(z.unknown()),
  images: z.array(z.unknown()),
  collections: z.array(z.unknown()),
  wishlistItems: z.array(z.unknown()),
  cartItems: z.array(z.unknown()),
  orderItems: z.array(z.unknown())
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