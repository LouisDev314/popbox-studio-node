import * as z from 'zod';

export const ProductCollectionScalarFieldEnumSchema = z.enum(['productId', 'collectionId', 'sortOrder'])

export type ProductCollectionScalarFieldEnum = z.infer<typeof ProductCollectionScalarFieldEnumSchema>;