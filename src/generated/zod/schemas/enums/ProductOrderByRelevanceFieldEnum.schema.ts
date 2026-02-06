import * as z from 'zod';

export const ProductOrderByRelevanceFieldEnumSchema = z.enum(['id', 'name', 'description', 'vendor', 'categoryId'])

export type ProductOrderByRelevanceFieldEnum = z.infer<typeof ProductOrderByRelevanceFieldEnumSchema>;