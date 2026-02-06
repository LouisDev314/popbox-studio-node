import * as z from 'zod';

export const OrderStatusHistoryScalarFieldEnumSchema = z.enum(['id', 'orderId', 'fromStatus', 'toStatus', 'reason', 'changedBy', 'createdAt', 'updatedAt'])

export type OrderStatusHistoryScalarFieldEnum = z.infer<typeof OrderStatusHistoryScalarFieldEnumSchema>;