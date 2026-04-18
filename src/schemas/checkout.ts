import { z } from 'zod';
import { CHECKOUT_MAX_LINE_ITEMS } from '../constants/checkout';

export const checkoutBodySchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.uuid(),
        quantity: z.coerce.number().int().min(1).max(20),
      }),
    )
    .min(1)
    .max(CHECKOUT_MAX_LINE_ITEMS),
});

export const successQuerySchema = z.object({
  session_id: z.string().min(1),
});
