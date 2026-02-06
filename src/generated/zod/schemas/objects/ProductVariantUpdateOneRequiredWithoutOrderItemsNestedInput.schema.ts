import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductVariantCreateWithoutOrderItemsInputObjectSchema as ProductVariantCreateWithoutOrderItemsInputObjectSchema } from './ProductVariantCreateWithoutOrderItemsInput.schema';
import { ProductVariantUncheckedCreateWithoutOrderItemsInputObjectSchema as ProductVariantUncheckedCreateWithoutOrderItemsInputObjectSchema } from './ProductVariantUncheckedCreateWithoutOrderItemsInput.schema';
import { ProductVariantCreateOrConnectWithoutOrderItemsInputObjectSchema as ProductVariantCreateOrConnectWithoutOrderItemsInputObjectSchema } from './ProductVariantCreateOrConnectWithoutOrderItemsInput.schema';
import { ProductVariantUpsertWithoutOrderItemsInputObjectSchema as ProductVariantUpsertWithoutOrderItemsInputObjectSchema } from './ProductVariantUpsertWithoutOrderItemsInput.schema';
import { ProductVariantWhereUniqueInputObjectSchema as ProductVariantWhereUniqueInputObjectSchema } from './ProductVariantWhereUniqueInput.schema';
import { ProductVariantUpdateToOneWithWhereWithoutOrderItemsInputObjectSchema as ProductVariantUpdateToOneWithWhereWithoutOrderItemsInputObjectSchema } from './ProductVariantUpdateToOneWithWhereWithoutOrderItemsInput.schema';
import { ProductVariantUpdateWithoutOrderItemsInputObjectSchema as ProductVariantUpdateWithoutOrderItemsInputObjectSchema } from './ProductVariantUpdateWithoutOrderItemsInput.schema';
import { ProductVariantUncheckedUpdateWithoutOrderItemsInputObjectSchema as ProductVariantUncheckedUpdateWithoutOrderItemsInputObjectSchema } from './ProductVariantUncheckedUpdateWithoutOrderItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductVariantCreateWithoutOrderItemsInputObjectSchema), z.lazy(() => ProductVariantUncheckedCreateWithoutOrderItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductVariantCreateOrConnectWithoutOrderItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => ProductVariantUpsertWithoutOrderItemsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductVariantWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ProductVariantUpdateToOneWithWhereWithoutOrderItemsInputObjectSchema), z.lazy(() => ProductVariantUpdateWithoutOrderItemsInputObjectSchema), z.lazy(() => ProductVariantUncheckedUpdateWithoutOrderItemsInputObjectSchema)]).optional()
}).strict();
export const ProductVariantUpdateOneRequiredWithoutOrderItemsNestedInputObjectSchema: z.ZodType<Prisma.ProductVariantUpdateOneRequiredWithoutOrderItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantUpdateOneRequiredWithoutOrderItemsNestedInput>;
export const ProductVariantUpdateOneRequiredWithoutOrderItemsNestedInputObjectZodSchema = makeSchema();
