import * as z from 'zod';

export const ProductImageOrderByRelevanceFieldEnumSchema = z.enum(['id', 'productId', 'objectKey', 'altText'])

export type ProductImageOrderByRelevanceFieldEnum = z.infer<typeof ProductImageOrderByRelevanceFieldEnumSchema>;