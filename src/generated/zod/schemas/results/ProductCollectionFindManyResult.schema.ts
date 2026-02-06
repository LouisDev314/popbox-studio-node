import * as z from 'zod';
export const ProductCollectionFindManyResultSchema = z.object({
  data: z.array(z.object({
  productId: z.string(),
  collectionId: z.string(),
  sortOrder: z.number().int(),
  product: z.unknown(),
  collection: z.unknown()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});