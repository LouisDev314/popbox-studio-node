import * as z from 'zod';
export const CartItemGroupByResultSchema = z.array(z.object({
  id: z.string(),
  cartId: z.string(),
  productId: z.string(),
  variantId: z.string(),
  quantity: z.number().int(),
  _count: z.object({
    id: z.number(),
    cartId: z.number(),
    productId: z.number(),
    variantId: z.number(),
    quantity: z.number(),
    cart: z.number(),
    product: z.number(),
    variant: z.number()
  }).optional(),
  _sum: z.object({
    quantity: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    quantity: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    cartId: z.string().nullable(),
    productId: z.string().nullable(),
    variantId: z.string().nullable(),
    quantity: z.number().int().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    cartId: z.string().nullable(),
    productId: z.string().nullable(),
    variantId: z.string().nullable(),
    quantity: z.number().int().nullable()
  }).nullable().optional()
}));