import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  productId: z.string(),
  name: z.string().max(100),
  price: z.bigint(),
  currency: z.string().max(3).optional(),
  stock: z.number().int(),
  reservedStock: z.number().int().optional(),
  imageObjectKey: z.string().max(512).optional().nullable(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();
export const ProductVariantCreateManyInputObjectSchema: z.ZodType<Prisma.ProductVariantCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantCreateManyInput>;
export const ProductVariantCreateManyInputObjectZodSchema = makeSchema();
