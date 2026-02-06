import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductVariantWhereUniqueInputObjectSchema as ProductVariantWhereUniqueInputObjectSchema } from './ProductVariantWhereUniqueInput.schema';
import { ProductVariantCreateWithoutCartItemsInputObjectSchema as ProductVariantCreateWithoutCartItemsInputObjectSchema } from './ProductVariantCreateWithoutCartItemsInput.schema';
import { ProductVariantUncheckedCreateWithoutCartItemsInputObjectSchema as ProductVariantUncheckedCreateWithoutCartItemsInputObjectSchema } from './ProductVariantUncheckedCreateWithoutCartItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductVariantWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductVariantCreateWithoutCartItemsInputObjectSchema), z.lazy(() => ProductVariantUncheckedCreateWithoutCartItemsInputObjectSchema)])
}).strict();
export const ProductVariantCreateOrConnectWithoutCartItemsInputObjectSchema: z.ZodType<Prisma.ProductVariantCreateOrConnectWithoutCartItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantCreateOrConnectWithoutCartItemsInput>;
export const ProductVariantCreateOrConnectWithoutCartItemsInputObjectZodSchema = makeSchema();
