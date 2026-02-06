import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().max(100)
}).strict();
export const CategoryCreateWithoutProductsInputObjectSchema: z.ZodType<Prisma.CategoryCreateWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateWithoutProductsInput>;
export const CategoryCreateWithoutProductsInputObjectZodSchema = makeSchema();
