import * as z from 'zod';

export const OrderStatusHistoryOrderByRelevanceFieldEnumSchema = z.enum(['id', 'orderId', 'reason', 'changedBy'])

export type OrderStatusHistoryOrderByRelevanceFieldEnum = z.infer<typeof OrderStatusHistoryOrderByRelevanceFieldEnumSchema>;