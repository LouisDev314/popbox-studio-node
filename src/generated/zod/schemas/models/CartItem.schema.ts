import * as z from 'zod';

export const CartItemSchema = z.object({
  id: z.string(),
  cartId: z.string(),
  productId: z.string(),
  variantId: z.string(),
  quantity: z.number().int(),
});

export type CartItemType = z.infer<typeof CartItemSchema>;
