import * as z from 'zod';
export const ProductImageCreateResultSchema = z.object({
  id: z.string(),
  productId: z.string(),
  objectKey: z.string(),
  altText: z.string().optional(),
  sortOrder: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  product: z.unknown()
});