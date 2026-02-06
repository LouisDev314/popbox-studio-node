import * as z from 'zod';

export const ActiveUserOrderByRelevanceFieldEnumSchema = z.enum(['id', 'supabaseUserId', 'email', 'name'])

export type ActiveUserOrderByRelevanceFieldEnum = z.infer<typeof ActiveUserOrderByRelevanceFieldEnumSchema>;