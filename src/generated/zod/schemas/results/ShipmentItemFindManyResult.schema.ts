import * as z from 'zod';
export const ShipmentItemFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  shipmentId: z.string(),
  orderItemId: z.string(),
  quantity: z.number().int(),
  shipment: z.unknown(),
  orderItem: z.unknown()
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