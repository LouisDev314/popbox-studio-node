import * as z from 'zod';
export const CollectionUpdateManyResultSchema = z.object({
  count: z.number()
});