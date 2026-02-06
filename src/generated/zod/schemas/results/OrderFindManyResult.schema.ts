import * as z from 'zod';
export const OrderFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  orderNumber: z.string(),
  userId: z.string(),
  status: z.unknown(),
  subtotalAmount: z.bigint(),
  taxAmount: z.bigint(),
  shippingAmount: z.bigint(),
  discountAmount: z.bigint(),
  totalAmount: z.bigint(),
  currency: z.string(),
  metadata: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  user: z.unknown(),
  items: z.array(z.unknown()),
  addresses: z.array(z.unknown()),
  payments: z.array(z.unknown()),
  shipments: z.array(z.unknown()),
  statusHistory: z.array(z.unknown())
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