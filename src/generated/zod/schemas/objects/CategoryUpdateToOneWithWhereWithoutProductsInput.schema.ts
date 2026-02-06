import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryWhereInputObjectSchema as CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema';
import { CategoryUpdateWithoutProductsInputObjectSchema as CategoryUpdateWithoutProductsInputObjectSchema } from './CategoryUpdateWithoutProductsInput.schema';
import { CategoryUncheckedUpdateWithoutProductsInputObjectSchema as CategoryUncheckedUpdateWithoutProductsInputObjectSchema } from './CategoryUncheckedUpdateWithoutProductsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CategoryUpdateWithoutProductsInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateWithoutProductsInputObjectSchema)])
}).strict();
export const CategoryUpdateToOneWithWhereWithoutProductsInputObjectSchema: z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutProductsInput>;
export const CategoryUpdateToOneWithWhereWithoutProductsInputObjectZodSchema = makeSchema();
