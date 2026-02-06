import * as z from 'zod';
export const ProductCollectionCreateManyResultSchema = z.object({
  count: z.number()
});