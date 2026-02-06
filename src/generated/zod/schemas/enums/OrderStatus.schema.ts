import * as z from 'zod';

export const OrderStatusSchema = z.enum(['PENDING', 'PAYMENT_PROCESSING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'FAILED', 'CANCELLED'])

export type OrderStatus = z.infer<typeof OrderStatusSchema>;