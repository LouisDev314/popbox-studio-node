import { z } from 'zod';

const baseSearchQuerySchema = z.object({
  q: z.string().trim().min(2),
});

export const searchQuerySchema = baseSearchQuerySchema
  .extend({
    limit: z.coerce.number().min(1).max(50).optional(),
  })
  .strict();

export const autocompleteQuerySchema = baseSearchQuerySchema
  .extend({
    limit: z.coerce.number().min(1).max(10).optional(),
  })
  .strict();
