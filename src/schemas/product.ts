import { z } from 'zod';

export const listProductsQuerySchema = z
  .object({
    limit: z.coerce.number().min(1).max(50).optional(),
    cursor: z.string().optional(),
    collection: z.string().optional(),
    tag: z.string().optional(),
    type: z.enum(['standard', 'kuji']).optional(),
    sort: z.enum(['newest', 'price_asc', 'price_desc', 'name_asc', 'name_desc']).optional(),
  })
  .strict();

export const productSlugParamsSchema = z.object({
  slug: z.string().min(1),
});
