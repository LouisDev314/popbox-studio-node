import * as z from 'zod';

export const CartOrderByRelevanceFieldEnumSchema = z.enum(['id', 'userId'])

export type CartOrderByRelevanceFieldEnum = z.infer<typeof CartOrderByRelevanceFieldEnumSchema>;