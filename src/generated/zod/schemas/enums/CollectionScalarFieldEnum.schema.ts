import * as z from 'zod';

export const CollectionScalarFieldEnumSchema = z.enum(['id', 'name', 'description', 'isActive', 'createdAt', 'updatedAt'])

export type CollectionScalarFieldEnum = z.infer<typeof CollectionScalarFieldEnumSchema>;