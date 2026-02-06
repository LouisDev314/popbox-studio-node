import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductVariantUpdateWithoutCartItemsInputObjectSchema as ProductVariantUpdateWithoutCartItemsInputObjectSchema } from './ProductVariantUpdateWithoutCartItemsInput.schema';
import { ProductVariantUncheckedUpdateWithoutCartItemsInputObjectSchema as ProductVariantUncheckedUpdateWithoutCartItemsInputObjectSchema } from './ProductVariantUncheckedUpdateWithoutCartItemsInput.schema';
import { ProductVariantCreateWithoutCartItemsInputObjectSchema as ProductVariantCreateWithoutCartItemsInputObjectSchema } from './ProductVariantCreateWithoutCartItemsInput.schema';
import { ProductVariantUncheckedCreateWithoutCartItemsInputObjectSchema as ProductVariantUncheckedCreateWithoutCartItemsInputObjectSchema } from './ProductVariantUncheckedCreateWithoutCartItemsInput.schema';
import { ProductVariantWhereInputObjectSchema as ProductVariantWhereInputObjectSchema } from './ProductVariantWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ProductVariantUpdateWithoutCartItemsInputObjectSchema), z.lazy(() => ProductVariantUncheckedUpdateWithoutCartItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductVariantCreateWithoutCartItemsInputObjectSchema), z.lazy(() => ProductVariantUncheckedCreateWithoutCartItemsInputObjectSchema)]),
  where: z.lazy(() => ProductVariantWhereInputObjectSchema).optional()
}).strict();
export const ProductVariantUpsertWithoutCartItemsInputObjectSchema: z.ZodType<Prisma.ProductVariantUpsertWithoutCartItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantUpsertWithoutCartItemsInput>;
export const ProductVariantUpsertWithoutCartItemsInputObjectZodSchema = makeSchema();
