import * as z from 'zod';
// prettier-ignore
export const ProductImageInputSchema = z.object({
    id: z.string(),
    productId: z.string(),
    objectKey: z.string(),
    altText: z.string().optional().nullable(),
    sortOrder: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date().optional().nullable(),
    product: z.unknown()
}).strict();

export type ProductImageInputType = z.infer<typeof ProductImageInputSchema>;
