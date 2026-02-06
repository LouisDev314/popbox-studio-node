import * as z from 'zod';

export const OrderAddressScalarFieldEnumSchema = z.enum(['id', 'orderId', 'type', 'name', 'line1', 'line2', 'city', 'state', 'postalCode', 'country', 'phone', 'createdAt', 'updatedAt'])

export type OrderAddressScalarFieldEnum = z.infer<typeof OrderAddressScalarFieldEnumSchema>;