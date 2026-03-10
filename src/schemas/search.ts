import { z } from 'zod';

export const searchQuerySchema = z
  .object({
    q: z.string().min(2),
    limit: z.coerce.number().min(1).max(50).optional(),
  })
  .strict();
