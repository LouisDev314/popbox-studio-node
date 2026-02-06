import * as z from 'zod';

export const WishlistItemScalarFieldEnumSchema = z.enum(['id', 'wishlistId', 'productId', 'createdAt'])

export type WishlistItemScalarFieldEnum = z.infer<typeof WishlistItemScalarFieldEnumSchema>;