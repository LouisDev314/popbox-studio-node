import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductVariantWhereInputObjectSchema as ProductVariantWhereInputObjectSchema } from './ProductVariantWhereInput.schema';
import { ProductVariantUpdateWithoutCartItemsInputObjectSchema as ProductVariantUpdateWithoutCartItemsInputObjectSchema } from './ProductVariantUpdateWithoutCartItemsInput.schema';
import { ProductVariantUncheckedUpdateWithoutCartItemsInputObjectSchema as ProductVariantUncheckedUpdateWithoutCartItemsInputObjectSchema } from './ProductVariantUncheckedUpdateWithoutCartItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductVariantWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ProductVariantUpdateWithoutCartItemsInputObjectSchema), z.lazy(() => ProductVariantUncheckedUpdateWithoutCartItemsInputObjectSchema)])
}).strict();
export const ProductVariantUpdateToOneWithWhereWithoutCartItemsInputObjectSchema: z.ZodType<Prisma.ProductVariantUpdateToOneWithWhereWithoutCartItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantUpdateToOneWithWhereWithoutCartItemsInput>;
export const ProductVariantUpdateToOneWithWhereWithoutCartItemsInputObjectZodSchema = makeSchema();
