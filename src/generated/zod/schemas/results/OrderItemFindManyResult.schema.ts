import * as z from 'zod';
export const OrderItemFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  orderId: z.string(),
  productId: z.string(),
  variantId: z.string(),
  productName: z.string(),
  variantName: z.string().optional(),
  quantity: z.number().int(),
  unitPrice: z.bigint(),
  currency: z.string(),
  order: z.unknown(),
  product: z.unknown(),
  variant: z.unknown(),
  shipmentItems: z.array(z.unknown())
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