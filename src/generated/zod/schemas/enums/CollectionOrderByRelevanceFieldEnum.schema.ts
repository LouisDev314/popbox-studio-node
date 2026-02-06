import * as z from 'zod';

export const CollectionOrderByRelevanceFieldEnumSchema = z.enum(['id', 'name', 'description'])

export type CollectionOrderByRelevanceFieldEnum = z.infer<typeof CollectionOrderByRelevanceFieldEnumSchema>;