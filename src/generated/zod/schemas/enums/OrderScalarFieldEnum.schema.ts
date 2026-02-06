import * as z from 'zod';

export const OrderScalarFieldEnumSchema = z.enum(['id', 'orderNumber', 'userId', 'status', 'subtotalAmount', 'taxAmount', 'shippingAmount', 'discountAmount', 'totalAmount', 'currency', 'metadata', 'createdAt', 'updatedAt'])

export type OrderScalarFieldEnum = z.infer<typeof OrderScalarFieldEnumSchema>;