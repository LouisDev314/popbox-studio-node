import * as z from 'zod';
// prettier-ignore
export const ProductImageResultSchema = z.object({
    id: z.string(),
    productId: z.string(),
    objectKey: z.string(),
    altText: z.string().nullable(),
    sortOrder: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    product: z.unknown()
}).strict();

export type ProductImageResultType = z.infer<typeof ProductImageResultSchema>;
