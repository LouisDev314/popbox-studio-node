import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().max(100).optional()
}).strict();
export const CategoryWhereUniqueInputObjectSchema: z.ZodType<Prisma.CategoryWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryWhereUniqueInput>;
export const CategoryWhereUniqueInputObjectZodSchema = makeSchema();
