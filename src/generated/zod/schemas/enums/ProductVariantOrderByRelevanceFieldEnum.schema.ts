import * as z from 'zod';

export const ProductVariantOrderByRelevanceFieldEnumSchema = z.enum(['id', 'productId', 'name', 'currency', 'imageObjectKey'])

export type ProductVariantOrderByRelevanceFieldEnum = z.infer<typeof ProductVariantOrderByRelevanceFieldEnumSchema>;