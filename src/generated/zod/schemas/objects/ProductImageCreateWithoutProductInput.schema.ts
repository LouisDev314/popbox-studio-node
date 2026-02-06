import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  objectKey: z.string().max(512),
  altText: z.string().max(150).optional().nullable(),
  sortOrder: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();
export const ProductImageCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductImageCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductImageCreateWithoutProductInput>;
export const ProductImageCreateWithoutProductInputObjectZodSchema = makeSchema();
