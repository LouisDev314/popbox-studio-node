import * as z from 'zod';
export const ProductVariantFindUniqueResultSchema = z.nullable(z.object({
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
}));