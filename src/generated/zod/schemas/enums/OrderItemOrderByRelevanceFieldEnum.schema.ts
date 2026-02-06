import * as z from 'zod';

export const OrderItemOrderByRelevanceFieldEnumSchema = z.enum(['id', 'orderId', 'productId', 'variantId', 'productName', 'variantName', 'currency'])

export type OrderItemOrderByRelevanceFieldEnum = z.infer<typeof OrderItemOrderByRelevanceFieldEnumSchema>;