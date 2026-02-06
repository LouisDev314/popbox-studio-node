import * as z from 'zod';

export const ProductImageScalarFieldEnumSchema = z.enum(['id', 'productId', 'objectKey', 'altText', 'sortOrder', 'createdAt', 'updatedAt'])

export type ProductImageScalarFieldEnum = z.infer<typeof ProductImageScalarFieldEnumSchema>;