import * as z from 'zod';
export const ProductCollectionDeleteManyResultSchema = z.object({
  count: z.number()
});