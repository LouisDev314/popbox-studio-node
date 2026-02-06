import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductUncheckedCreateNestedManyWithoutCategoryInputObjectSchema as ProductUncheckedCreateNestedManyWithoutCategoryInputObjectSchema } from './ProductUncheckedCreateNestedManyWithoutCategoryInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string().max(100),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutCategoryInputObjectSchema).optional()
}).strict();
export const CategoryUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CategoryUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUncheckedCreateInput>;
export const CategoryUncheckedCreateInputObjectZodSchema = makeSchema();
