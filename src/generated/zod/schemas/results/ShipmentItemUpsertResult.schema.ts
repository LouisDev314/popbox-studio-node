import * as z from 'zod';
export const ShipmentItemUpsertResultSchema = z.object({
  id: z.string(),
  shipmentId: z.string(),
  orderItemId: z.string(),
  quantity: z.number().int(),
  shipment: z.unknown(),
  orderItem: z.unknown()
});