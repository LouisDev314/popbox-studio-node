import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductVariantWhereInputObjectSchema as ProductVariantWhereInputObjectSchema } from './ProductVariantWhereInput.schema';
import { ProductVariantUpdateWithoutOrderItemsInputObjectSchema as ProductVariantUpdateWithoutOrderItemsInputObjectSchema } from './ProductVariantUpdateWithoutOrderItemsInput.schema';
import { ProductVariantUncheckedUpdateWithoutOrderItemsInputObjectSchema as ProductVariantUncheckedUpdateWithoutOrderItemsInputObjectSchema } from './ProductVariantUncheckedUpdateWithoutOrderItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductVariantWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ProductVariantUpdateWithoutOrderItemsInputObjectSchema), z.lazy(() => ProductVariantUncheckedUpdateWithoutOrderItemsInputObjectSchema)])
}).strict();
export const ProductVariantUpdateToOneWithWhereWithoutOrderItemsInputObjectSchema: z.ZodType<Prisma.ProductVariantUpdateToOneWithWhereWithoutOrderItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantUpdateToOneWithWhereWithoutOrderItemsInput>;
export const ProductVariantUpdateToOneWithWhereWithoutOrderItemsInputObjectZodSchema = makeSchema();
