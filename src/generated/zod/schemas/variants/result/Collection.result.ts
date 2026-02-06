import * as z from 'zod';
// prettier-ignore
export const CollectionResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    products: z.array(z.unknown())
}).strict();

export type CollectionResultType = z.infer<typeof CollectionResultSchema>;
