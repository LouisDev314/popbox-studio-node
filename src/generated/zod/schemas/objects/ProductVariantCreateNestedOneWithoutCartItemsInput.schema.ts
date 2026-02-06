import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductVariantCreateWithoutCartItemsInputObjectSchema as ProductVariantCreateWithoutCartItemsInputObjectSchema } from './ProductVariantCreateWithoutCartItemsInput.schema';
import { ProductVariantUncheckedCreateWithoutCartItemsInputObjectSchema as ProductVariantUncheckedCreateWithoutCartItemsInputObjectSchema } from './ProductVariantUncheckedCreateWithoutCartItemsInput.schema';
import { ProductVariantCreateOrConnectWithoutCartItemsInputObjectSchema as ProductVariantCreateOrConnectWithoutCartItemsInputObjectSchema } from './ProductVariantCreateOrConnectWithoutCartItemsInput.schema';
import { ProductVariantWhereUniqueInputObjectSchema as ProductVariantWhereUniqueInputObjectSchema } from './ProductVariantWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductVariantCreateWithoutCartItemsInputObjectSchema), z.lazy(() => ProductVariantUncheckedCreateWithoutCartItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductVariantCreateOrConnectWithoutCartItemsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductVariantWhereUniqueInputObjectSchema).optional()
}).strict();
export const ProductVariantCreateNestedOneWithoutCartItemsInputObjectSchema: z.ZodType<Prisma.ProductVariantCreateNestedOneWithoutCartItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantCreateNestedOneWithoutCartItemsInput>;
export const ProductVariantCreateNestedOneWithoutCartItemsInputObjectZodSchema = makeSchema();
