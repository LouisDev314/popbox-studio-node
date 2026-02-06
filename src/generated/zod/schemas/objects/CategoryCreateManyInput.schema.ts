import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().max(100)
}).strict();
export const CategoryCreateManyInputObjectSchema: z.ZodType<Prisma.CategoryCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateManyInput>;
export const CategoryCreateManyInputObjectZodSchema = makeSchema();
