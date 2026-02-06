import * as z from 'zod';

export const WishlistItemOrderByRelevanceFieldEnumSchema = z.enum(['id', 'wishlistId', 'productId'])

export type WishlistItemOrderByRelevanceFieldEnum = z.infer<typeof WishlistItemOrderByRelevanceFieldEnumSchema>;