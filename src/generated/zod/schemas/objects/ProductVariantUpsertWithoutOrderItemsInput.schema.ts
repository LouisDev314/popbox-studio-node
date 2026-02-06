import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductVariantUpdateWithoutOrderItemsInputObjectSchema as ProductVariantUpdateWithoutOrderItemsInputObjectSchema } from './ProductVariantUpdateWithoutOrderItemsInput.schema';
import { ProductVariantUncheckedUpdateWithoutOrderItemsInputObjectSchema as ProductVariantUncheckedUpdateWithoutOrderItemsInputObjectSchema } from './ProductVariantUncheckedUpdateWithoutOrderItemsInput.schema';
import { ProductVariantCreateWithoutOrderItemsInputObjectSchema as ProductVariantCreateWithoutOrderItemsInputObjectSchema } from './ProductVariantCreateWithoutOrderItemsInput.schema';
import { ProductVariantUncheckedCreateWithoutOrderItemsInputObjectSchema as ProductVariantUncheckedCreateWithoutOrderItemsInputObjectSchema } from './ProductVariantUncheckedCreateWithoutOrderItemsInput.schema';
import { ProductVariantWhereInputObjectSchema as ProductVariantWhereInputObjectSchema } from './ProductVariantWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ProductVariantUpdateWithoutOrderItemsInputObjectSchema), z.lazy(() => ProductVariantUncheckedUpdateWithoutOrderItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductVariantCreateWithoutOrderItemsInputObjectSchema), z.lazy(() => ProductVariantUncheckedCreateWithoutOrderItemsInputObjectSchema)]),
  where: z.lazy(() => ProductVariantWhereInputObjectSchema).optional()
}).strict();
export const ProductVariantUpsertWithoutOrderItemsInputObjectSchema: z.ZodType<Prisma.ProductVariantUpsertWithoutOrderItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantUpsertWithoutOrderItemsInput>;
export const ProductVariantUpsertWithoutOrderItemsInputObjectZodSchema = makeSchema();
