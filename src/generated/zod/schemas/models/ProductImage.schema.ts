import * as z from 'zod';

export const ProductImageSchema = z.object({
  id: z.string(),
  productId: z.string(),
  objectKey: z.string(),
  altText: z.string().nullish(),
  sortOrder: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
});

export type ProductImageType = z.infer<typeof ProductImageSchema>;
