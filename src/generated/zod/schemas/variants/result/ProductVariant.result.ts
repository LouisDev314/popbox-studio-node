import * as z from 'zod';
// prettier-ignore
export const ProductVariantResultSchema = z.object({
    id: z.string(),
    productId: z.string(),
    name: z.string(),
    price: z.bigint(),
    currency: z.string(),
    stock: z.number().int(),
    reservedStock: z.number().int(),
    imageObjectKey: z.string().nullable(),
    isActive: z.boolean(),
    sortOrder: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    product: z.unknown(),
    cartItems: z.array(z.unknown()),
    orderItems: z.array(z.unknown())
}).strict();

export type ProductVariantResultType = z.infer<typeof ProductVariantResultSchema>;
