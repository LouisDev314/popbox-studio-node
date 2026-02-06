import * as z from 'zod';
// prettier-ignore
export const ProductImageModelSchema = z.object({
    id: z.string(),
    productId: z.string(),
    objectKey: z.string(),
    altText: z.string().nullable(),
    sortOrder: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    product: z.unknown()
}).strict();

export type ProductImagePureType = z.infer<typeof ProductImageModelSchema>;
