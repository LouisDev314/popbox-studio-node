import * as z from 'zod';
import { OrderStatusSchema } from '../../enums/OrderStatus.schema';
// prettier-ignore
export const OrderStatusHistoryInputSchema = z.object({
    id: z.string(),
    orderId: z.string(),
    fromStatus: OrderStatusSchema.optional().nullable(),
    toStatus: OrderStatusSchema,
    reason: z.string().optional().nullable(),
    changedBy: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date().optional().nullable(),
    order: z.unknown(),
    user: z.unknown().optional().nullable()
}).strict();

export type OrderStatusHistoryInputType = z.infer<typeof OrderStatusHistoryInputSchema>;
