import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductVariantWhereUniqueInputObjectSchema as ProductVariantWhereUniqueInputObjectSchema } from './ProductVariantWhereUniqueInput.schema';
import { ProductVariantCreateWithoutOrderItemsInputObjectSchema as ProductVariantCreateWithoutOrderItemsInputObjectSchema } from './ProductVariantCreateWithoutOrderItemsInput.schema';
import { ProductVariantUncheckedCreateWithoutOrderItemsInputObjectSchema as ProductVariantUncheckedCreateWithoutOrderItemsInputObjectSchema } from './ProductVariantUncheckedCreateWithoutOrderItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductVariantWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductVariantCreateWithoutOrderItemsInputObjectSchema), z.lazy(() => ProductVariantUncheckedCreateWithoutOrderItemsInputObjectSchema)])
}).strict();
export const ProductVariantCreateOrConnectWithoutOrderItemsInputObjectSchema: z.ZodType<Prisma.ProductVariantCreateOrConnectWithoutOrderItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantCreateOrConnectWithoutOrderItemsInput>;
export const ProductVariantCreateOrConnectWithoutOrderItemsInputObjectZodSchema = makeSchema();
