import * as z from 'zod';
// prettier-ignore
export const ProductCollectionModelSchema = z.object({
    productId: z.string(),
    collectionId: z.string(),
    sortOrder: z.number().int(),
    product: z.unknown(),
    collection: z.unknown()
}).strict();

export type ProductCollectionPureType = z.infer<typeof ProductCollectionModelSchema>;
