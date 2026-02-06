import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  productId: z.string(),
  objectKey: z.string().max(512),
  altText: z.string().max(150).optional().nullable(),
  sortOrder: z.number().int().optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const ProductImageUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ProductImageUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductImageUncheckedCreateInput>;
export const ProductImageUncheckedCreateInputObjectZodSchema = makeSchema();
