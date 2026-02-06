import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateNestedManyWithoutCategoryInputObjectSchema as ProductCreateNestedManyWithoutCategoryInputObjectSchema } from './ProductCreateNestedManyWithoutCategoryInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().max(100),
  products: z.lazy(() => ProductCreateNestedManyWithoutCategoryInputObjectSchema).optional()
}).strict();
export const CategoryCreateInputObjectSchema: z.ZodType<Prisma.CategoryCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateInput>;
export const CategoryCreateInputObjectZodSchema = makeSchema();
