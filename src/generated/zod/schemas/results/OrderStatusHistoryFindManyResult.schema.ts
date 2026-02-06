import * as z from 'zod';
export const OrderStatusHistoryFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  orderId: z.string(),
  fromStatus: z.unknown().optional(),
  toStatus: z.unknown(),
  reason: z.string().optional(),
  changedBy: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  order: z.unknown(),
  user: z.unknown().optional()
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