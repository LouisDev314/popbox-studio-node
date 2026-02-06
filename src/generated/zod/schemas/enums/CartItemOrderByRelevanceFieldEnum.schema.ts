import * as z from 'zod';

export const CartItemOrderByRelevanceFieldEnumSchema = z.enum(['id', 'cartId', 'productId', 'variantId'])

export type CartItemOrderByRelevanceFieldEnum = z.infer<typeof CartItemOrderByRelevanceFieldEnumSchema>;