import * as z from 'zod';
// prettier-ignore
export const ProductCollectionResultSchema = z.object({
    productId: z.string(),
    collectionId: z.string(),
    sortOrder: z.number().int(),
    product: z.unknown(),
    collection: z.unknown()
}).strict();

export type ProductCollectionResultType = z.infer<typeof ProductCollectionResultSchema>;
