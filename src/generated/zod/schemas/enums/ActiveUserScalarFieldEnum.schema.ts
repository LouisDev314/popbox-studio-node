import * as z from 'zod';

export const ActiveUserScalarFieldEnumSchema = z.enum(['id', 'supabaseUserId', 'email', 'name', 'role', 'createdAt', 'updatedAt'])

export type ActiveUserScalarFieldEnum = z.infer<typeof ActiveUserScalarFieldEnumSchema>;