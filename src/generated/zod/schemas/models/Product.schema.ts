import * as z from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  vendor: z.string().nullish(),
  categoryId: z.string(),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
});

export type ProductType = z.infer<typeof ProductSchema>;
