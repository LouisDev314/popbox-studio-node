import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductVariantCreateWithoutOrderItemsInputObjectSchema as ProductVariantCreateWithoutOrderItemsInputObjectSchema } from './ProductVariantCreateWithoutOrderItemsInput.schema';
import { ProductVariantUncheckedCreateWithoutOrderItemsInputObjectSchema as ProductVariantUncheckedCreateWithoutOrderItemsInputObjectSchema } from './ProductVariantUncheckedCreateWithoutOrderItemsInput.schema';
import { ProductVariantCreateOrConnectWithoutOrderItemsInputObjectSchema as ProductVariantCreateOrConnectWithoutOrderItemsInputObjectSchema } from './ProductVariantCreateOrConnectWithoutOrderItemsInput.schema';
import { ProductVariantWhereUniqueInputObjectSchema as ProductVariantWhereUniqueInputObjectSchema } from './ProductVariantWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductVariantCreateWithoutOrderItemsInputObjectSchema), z.lazy(() => ProductVariantUncheckedCreateWithoutOrderItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductVariantCreateOrConnectWithoutOrderItemsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductVariantWhereUniqueInputObjectSchema).optional()
}).strict();
export const ProductVariantCreateNestedOneWithoutOrderItemsInputObjectSchema: z.ZodType<Prisma.ProductVariantCreateNestedOneWithoutOrderItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantCreateNestedOneWithoutOrderItemsInput>;
export const ProductVariantCreateNestedOneWithoutOrderItemsInputObjectZodSchema = makeSchema();
