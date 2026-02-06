import * as z from 'zod';
export const CollectionCreateManyResultSchema = z.object({
  count: z.number()
});