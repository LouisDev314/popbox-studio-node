import * as z from 'zod';
export const ProductCollectionCreateResultSchema = z.object({
  productId: z.string(),
  collectionId: z.string(),
  sortOrder: z.number().int(),
  product: z.unknown(),
  collection: z.unknown()
});