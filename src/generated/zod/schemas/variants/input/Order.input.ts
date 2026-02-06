import * as z from 'zod';
import { OrderStatusSchema } from '../../enums/OrderStatus.schema';
// prettier-ignore
export const OrderInputSchema = z.object({
    id: z.string(),
    orderNumber: z.string(),
    userId: z.string(),
    status: OrderStatusSchema,
    subtotalAmount: z.bigint(),
    taxAmount: z.bigint(),
    shippingAmount: z.bigint(),
    discountAmount: z.bigint(),
    totalAmount: z.bigint(),
    currency: z.string(),
    metadata: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date().optional().nullable(),
    user: z.unknown(),
    items: z.array(z.unknown()),
    addresses: z.array(z.unknown()),
    payments: z.array(z.unknown()),
    shipments: z.array(z.unknown()),
    statusHistory: z.array(z.unknown())
}).strict();

export type OrderInputType = z.infer<typeof OrderInputSchema>;
