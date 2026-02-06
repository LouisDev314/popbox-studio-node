import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().max(150),
  description: z.string().optional().nullable(),
  vendor: z.string().max(100).optional().nullable(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();
export const ProductCreateManyCategoryInputObjectSchema: z.ZodType<Prisma.ProductCreateManyCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateManyCategoryInput>;
export const ProductCreateManyCategoryInputObjectZodSchema = makeSchema();
