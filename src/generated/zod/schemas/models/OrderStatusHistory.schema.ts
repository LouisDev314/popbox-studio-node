import * as z from 'zod';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';

export const OrderStatusHistorySchema = z.object({
  id: z.string(),
  orderId: z.string(),
  fromStatus: OrderStatusSchema.nullish(),
  toStatus: OrderStatusSchema,
  reason: z.string().nullish(),
  changedBy: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
});

export type OrderStatusHistoryType = z.infer<typeof OrderStatusHistorySchema>;
