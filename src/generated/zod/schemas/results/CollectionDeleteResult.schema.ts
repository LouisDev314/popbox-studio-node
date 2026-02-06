import * as z from 'zod';
export const CollectionDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  products: z.array(z.unknown())
}));