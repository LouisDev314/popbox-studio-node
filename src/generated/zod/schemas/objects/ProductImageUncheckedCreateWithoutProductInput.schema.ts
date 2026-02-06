import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  objectKey: z.string(),
  altText: z.string().optional().nullable(),
  sortOrder: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();
export const ProductImageUncheckedCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductImageUncheckedCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductImageUncheckedCreateWithoutProductInput>;
export const ProductImageUncheckedCreateWithoutProductInputObjectZodSchema = makeSchema();
