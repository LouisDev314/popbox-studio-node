import * as z from 'zod';

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type CategoryType = z.infer<typeof CategorySchema>;
