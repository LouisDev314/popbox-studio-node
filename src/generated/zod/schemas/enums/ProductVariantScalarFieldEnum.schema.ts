import * as z from 'zod';

export const ProductVariantScalarFieldEnumSchema = z.enum(['id', 'productId', 'name', 'price', 'currency', 'stock', 'reservedStock', 'imageObjectKey', 'isActive', 'sortOrder', 'createdAt', 'updatedAt'])

export type ProductVariantScalarFieldEnum = z.infer<typeof ProductVariantScalarFieldEnumSchema>;