import * as z from 'zod';

export const OrderItemScalarFieldEnumSchema = z.enum(['id', 'orderId', 'productId', 'variantId', 'productName', 'variantName', 'quantity', 'unitPrice', 'currency'])

export type OrderItemScalarFieldEnum = z.infer<typeof OrderItemScalarFieldEnumSchema>;