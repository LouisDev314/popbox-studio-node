import * as z from 'zod';
export const ProductCollectionUpsertResultSchema = z.object({
  productId: z.string(),
  collectionId: z.string(),
  sortOrder: z.number().int(),
  product: z.unknown(),
  collection: z.unknown()
});