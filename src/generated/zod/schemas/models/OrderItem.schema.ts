import * as z from 'zod';

export const OrderItemSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  productId: z.string(),
  variantId: z.string(),
  productName: z.string(),
  variantName: z.string().nullish(),
  quantity: z.number().int(),
  unitPrice: z.bigint(),
  currency: z.string().default("CAD"),
});

export type OrderItemType = z.infer<typeof OrderItemSchema>;
