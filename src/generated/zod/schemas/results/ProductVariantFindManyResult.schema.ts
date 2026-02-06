import * as z from 'zod';
export const ProductVariantFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  productId: z.string(),
  name: z.string(),
  price: z.bigint(),
  currency: z.string(),
  stock: z.number().int(),
  reservedStock: z.number().int(),
  imageObjectKey: z.string().optional(),
  isActive: z.boolean(),
  sortOrder: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  product: z.unknown(),
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