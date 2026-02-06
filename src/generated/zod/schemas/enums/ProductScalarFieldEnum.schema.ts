import * as z from 'zod';

export const ProductScalarFieldEnumSchema = z.enum(['id', 'name', 'description', 'vendor', 'categoryId', 'isActive', 'createdAt', 'updatedAt'])

export type ProductScalarFieldEnum = z.infer<typeof ProductScalarFieldEnumSchema>;