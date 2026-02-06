import * as z from 'zod';

export const CollectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
});

export type CollectionType = z.infer<typeof CollectionSchema>;
