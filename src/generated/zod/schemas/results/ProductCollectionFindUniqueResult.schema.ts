import * as z from 'zod';
export const ProductCollectionFindUniqueResultSchema = z.nullable(z.object({
  productId: z.string(),
  collectionId: z.string(),
  sortOrder: z.number().int(),
  product: z.unknown(),
  collection: z.unknown()
}));