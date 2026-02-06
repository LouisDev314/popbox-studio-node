import * as z from 'zod';

export const UserOrderByRelevanceFieldEnumSchema = z.enum(['id', 'supabaseUserId', 'email', 'name'])

export type UserOrderByRelevanceFieldEnum = z.infer<typeof UserOrderByRelevanceFieldEnumSchema>;