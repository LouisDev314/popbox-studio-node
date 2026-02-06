import * as z from 'zod';
import { OrderStatusSchema } from '../../enums/OrderStatus.schema';
// prettier-ignore
export const OrderStatusHistoryModelSchema = z.object({
    id: z.string(),
    orderId: z.string(),
    fromStatus: OrderStatusSchema.nullable(),
    toStatus: OrderStatusSchema,
    reason: z.string().nullable(),
    changedBy: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    order: z.unknown(),
    user: z.unknown().nullable()
}).strict();

export type OrderStatusHistoryPureType = z.infer<typeof OrderStatusHistoryModelSchema>;
