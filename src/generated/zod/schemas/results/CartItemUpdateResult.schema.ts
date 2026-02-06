import * as z from 'zod';
export const CartItemUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  cartId: z.string(),
  productId: z.string(),
  variantId: z.string(),
  quantity: z.number().int(),
  cart: z.unknown(),
  product: z.unknown(),
  variant: z.unknown()
}));