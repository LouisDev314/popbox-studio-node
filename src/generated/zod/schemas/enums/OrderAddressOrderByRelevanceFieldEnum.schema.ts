import * as z from 'zod';

export const OrderAddressOrderByRelevanceFieldEnumSchema = z.enum(['id', 'orderId', 'name', 'line1', 'line2', 'city', 'state', 'postalCode', 'country', 'phone'])

export type OrderAddressOrderByRelevanceFieldEnum = z.infer<typeof OrderAddressOrderByRelevanceFieldEnumSchema>;