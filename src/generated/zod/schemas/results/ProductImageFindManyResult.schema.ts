import * as z from 'zod';
export const ProductImageFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  productId: z.string(),
  objectKey: z.string(),
  altText: z.string().optional(),
  sortOrder: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  product: z.unknown()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});