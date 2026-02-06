import * as z from 'zod';

export const CartItemScalarFieldEnumSchema = z.enum(['id', 'cartId', 'productId', 'variantId', 'quantity'])

export type CartItemScalarFieldEnum = z.infer<typeof CartItemScalarFieldEnumSchema>;