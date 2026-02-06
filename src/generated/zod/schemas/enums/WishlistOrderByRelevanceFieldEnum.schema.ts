import * as z from 'zod';

export const WishlistOrderByRelevanceFieldEnumSchema = z.enum(['id', 'userId'])

export type WishlistOrderByRelevanceFieldEnum = z.infer<typeof WishlistOrderByRelevanceFieldEnumSchema>;