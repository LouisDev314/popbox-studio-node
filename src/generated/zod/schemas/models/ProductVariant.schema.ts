import * as z from 'zod';

export const ProductVariantSchema = z.object({
  id: z.string(),
  productId: z.string(),
  name: z.string(),
  price: z.bigint(),
  currency: z.string().default("CAD"),
  stock: z.number().int(),
  reservedStock: z.number().int(),
  imageObjectKey: z.string().nullish(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
});

export type ProductVariantType = z.infer<typeof ProductVariantSchema>;
