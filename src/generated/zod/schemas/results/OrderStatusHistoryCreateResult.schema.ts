import * as z from 'zod';
export const OrderStatusHistoryCreateResultSchema = z.object({
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
});