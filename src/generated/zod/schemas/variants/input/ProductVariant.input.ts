import * as z from 'zod';
// prettier-ignore
export const ProductVariantInputSchema = z.object({
    id: z.string(),
    productId: z.string(),
    name: z.string(),
    price: z.bigint(),
    currency: z.string(),
    stock: z.number().int(),
    reservedStock: z.number().int(),
    imageObjectKey: z.string().optional().nullable(),
    isActive: z.boolean(),
    sortOrder: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date().optional().nullable(),
    product: z.unknown(),
    cartItems: z.array(z.unknown()),
    orderItems: z.array(z.unknown())
}).strict();

export type ProductVariantInputType = z.infer<typeof ProductVariantInputSchema>;
