import * as z from 'zod';
// prettier-ignore
export const ProductCollectionInputSchema = z.object({
    productId: z.string(),
    collectionId: z.string(),
    sortOrder: z.number().int(),
    product: z.unknown(),
    collection: z.unknown()
}).strict();

export type ProductCollectionInputType = z.infer<typeof ProductCollectionInputSchema>;
