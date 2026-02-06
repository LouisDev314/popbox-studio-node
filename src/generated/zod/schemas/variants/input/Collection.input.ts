import * as z from 'zod';
// prettier-ignore
export const CollectionInputSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional().nullable(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date().optional().nullable(),
    products: z.array(z.unknown())
}).strict();

export type CollectionInputType = z.infer<typeof CollectionInputSchema>;
