import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryCreateWithoutProductsInputObjectSchema as CategoryCreateWithoutProductsInputObjectSchema } from './CategoryCreateWithoutProductsInput.schema';
import { CategoryUncheckedCreateWithoutProductsInputObjectSchema as CategoryUncheckedCreateWithoutProductsInputObjectSchema } from './CategoryUncheckedCreateWithoutProductsInput.schema';
import { CategoryCreateOrConnectWithoutProductsInputObjectSchema as CategoryCreateOrConnectWithoutProductsInputObjectSchema } from './CategoryCreateOrConnectWithoutProductsInput.schema';
import { CategoryWhereUniqueInputObjectSchema as CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CategoryCreateWithoutProductsInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutProductsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutProductsInputObjectSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputObjectSchema).optional()
}).strict();
export const CategoryCreateNestedOneWithoutProductsInputObjectSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateNestedOneWithoutProductsInput>;
export const CategoryCreateNestedOneWithoutProductsInputObjectZodSchema = makeSchema();
