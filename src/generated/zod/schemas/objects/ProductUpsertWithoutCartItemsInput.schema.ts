import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductUpdateWithoutCartItemsInputObjectSchema as ProductUpdateWithoutCartItemsInputObjectSchema } from './ProductUpdateWithoutCartItemsInput.schema';
import { ProductUncheckedUpdateWithoutCartItemsInputObjectSchema as ProductUncheckedUpdateWithoutCartItemsInputObjectSchema } from './ProductUncheckedUpdateWithoutCartItemsInput.schema';
import { ProductCreateWithoutCartItemsInputObjectSchema as ProductCreateWithoutCartItemsInputObjectSchema } from './ProductCreateWithoutCartItemsInput.schema';
import { ProductUncheckedCreateWithoutCartItemsInputObjectSchema as ProductUncheckedCreateWithoutCartItemsInputObjectSchema } from './ProductUncheckedCreateWithoutCartItemsInput.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ProductUpdateWithoutCartItemsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutCartItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductCreateWithoutCartItemsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCartItemsInputObjectSchema)]),
  where: z.lazy(() => ProductWhereInputObjectSchema).optional()
}).strict();
export const ProductUpsertWithoutCartItemsInputObjectSchema: z.ZodType<Prisma.ProductUpsertWithoutCartItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpsertWithoutCartItemsInput>;
export const ProductUpsertWithoutCartItemsInputObjectZodSchema = makeSchema();
