import * as z from 'zod';

export const OrderOrderByRelevanceFieldEnumSchema = z.enum(['id', 'orderNumber', 'userId', 'currency'])

export type OrderOrderByRelevanceFieldEnum = z.infer<typeof OrderOrderByRelevanceFieldEnumSchema>;