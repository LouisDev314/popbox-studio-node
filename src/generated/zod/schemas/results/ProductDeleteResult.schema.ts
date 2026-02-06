import * as z from 'zod';
export const ProductDeleteResultSchema = z.nullable(z.object({
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
}));