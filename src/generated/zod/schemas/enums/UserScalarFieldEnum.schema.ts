import * as z from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id', 'supabaseUserId', 'email', 'name', 'role', 'createdAt', 'updatedAt', 'deletedAt'])

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;