import * as z from 'zod';
// prettier-ignore
export const ProductResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    vendor: z.string().nullable(),
    categoryId: z.string(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    category: z.unknown(),
    variants: z.array(z.unknown()),
    images: z.array(z.unknown()),
    collections: z.array(z.unknown()),
    wishlistItems: z.array(z.unknown()),
    cartItems: z.array(z.unknown()),
    orderItems: z.array(z.unknown())
}).strict();

export type ProductResultType = z.infer<typeof ProductResultSchema>;
