import * as z from 'zod';
// prettier-ignore
export const ProductInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional().nullable(),
    vendor: z.string().optional().nullable(),
    categoryId: z.string(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date().optional().nullable(),
    category: z.unknown(),
    variants: z.array(z.unknown()),
    images: z.array(z.unknown()),
    collections: z.array(z.unknown()),
    wishlistItems: z.array(z.unknown()),
    cartItems: z.array(z.unknown()),
    orderItems: z.array(z.unknown())
}).strict();

export type ProductInputType = z.infer<typeof ProductInputSchema>;
