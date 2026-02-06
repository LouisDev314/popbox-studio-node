import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryCreateWithoutProductsInputObjectSchema as CategoryCreateWithoutProductsInputObjectSchema } from './CategoryCreateWithoutProductsInput.schema';
import { CategoryUncheckedCreateWithoutProductsInputObjectSchema as CategoryUncheckedCreateWithoutProductsInputObjectSchema } from './CategoryUncheckedCreateWithoutProductsInput.schema';
import { CategoryCreateOrConnectWithoutProductsInputObjectSchema as CategoryCreateOrConnectWithoutProductsInputObjectSchema } from './CategoryCreateOrConnectWithoutProductsInput.schema';
import { CategoryUpsertWithoutProductsInputObjectSchema as CategoryUpsertWithoutProductsInputObjectSchema } from './CategoryUpsertWithoutProductsInput.schema';
import { CategoryWhereUniqueInputObjectSchema as CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryUpdateToOneWithWhereWithoutProductsInputObjectSchema as CategoryUpdateToOneWithWhereWithoutProductsInputObjectSchema } from './CategoryUpdateToOneWithWhereWithoutProductsInput.schema';
import { CategoryUpdateWithoutProductsInputObjectSchema as CategoryUpdateWithoutProductsInputObjectSchema } from './CategoryUpdateWithoutProductsInput.schema';
import { CategoryUncheckedUpdateWithoutProductsInputObjectSchema as CategoryUncheckedUpdateWithoutProductsInputObjectSchema } from './CategoryUncheckedUpdateWithoutProductsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CategoryCreateWithoutProductsInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutProductsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutProductsInputObjectSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutProductsInputObjectSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => CategoryUpdateToOneWithWhereWithoutProductsInputObjectSchema), z.lazy(() => CategoryUpdateWithoutProductsInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateWithoutProductsInputObjectSchema)]).optional()
}).strict();
export const CategoryUpdateOneRequiredWithoutProductsNestedInputObjectSchema: z.ZodType<Prisma.CategoryUpdateOneRequiredWithoutProductsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUpdateOneRequiredWithoutProductsNestedInput>;
export const CategoryUpdateOneRequiredWithoutProductsNestedInputObjectZodSchema = makeSchema();
