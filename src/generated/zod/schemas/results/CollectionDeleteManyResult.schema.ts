import * as z from 'zod';
export const CollectionDeleteManyResultSchema = z.object({
  count: z.number()
});