import * as z from 'zod';
export const ProductCollectionAggregateResultSchema = z.object({  _count: z.object({
    productId: z.number(),
    collectionId: z.number(),
    sortOrder: z.number(),
    product: z.number(),
    collection: z.number()
  }).optional(),
  _sum: z.object({
    sortOrder: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    sortOrder: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    productId: z.string().nullable(),
    collectionId: z.string().nullable(),
    sortOrder: z.number().int().nullable()
  }).nullable().optional(),
  _max: z.object({
    productId: z.string().nullable(),
    collectionId: z.string().nullable(),
    sortOrder: z.number().int().nullable()
  }).nullable().optional()});