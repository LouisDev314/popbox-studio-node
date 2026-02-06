import * as z from 'zod';

export const ProductCollectionOrderByRelevanceFieldEnumSchema = z.enum(['productId', 'collectionId'])

export type ProductCollectionOrderByRelevanceFieldEnum = z.infer<typeof ProductCollectionOrderByRelevanceFieldEnumSchema>;