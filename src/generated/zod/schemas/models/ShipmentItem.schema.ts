import * as z from 'zod';

export const ShipmentItemSchema = z.object({
  id: z.string(),
  shipmentId: z.string(),
  orderItemId: z.string(),
  quantity: z.number().int(),
});

export type ShipmentItemType = z.infer<typeof ShipmentItemSchema>;
