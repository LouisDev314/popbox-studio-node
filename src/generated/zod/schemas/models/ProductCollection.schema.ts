import * as z from 'zod';

export const ProductCollectionSchema = z.object({
  productId: z.string(),
  collectionId: z.string(),
  sortOrder: z.number().int(),
});

export type ProductCollectionType = z.infer<typeof ProductCollectionSchema>;
