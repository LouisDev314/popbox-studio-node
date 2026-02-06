import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductVariantCreateWithoutCartItemsInputObjectSchema as ProductVariantCreateWithoutCartItemsInputObjectSchema } from './ProductVariantCreateWithoutCartItemsInput.schema';
import { ProductVariantUncheckedCreateWithoutCartItemsInputObjectSchema as ProductVariantUncheckedCreateWithoutCartItemsInputObjectSchema } from './ProductVariantUncheckedCreateWithoutCartItemsInput.schema';
import { ProductVariantCreateOrConnectWithoutCartItemsInputObjectSchema as ProductVariantCreateOrConnectWithoutCartItemsInputObjectSchema } from './ProductVariantCreateOrConnectWithoutCartItemsInput.schema';
import { ProductVariantUpsertWithoutCartItemsInputObjectSchema as ProductVariantUpsertWithoutCartItemsInputObjectSchema } from './ProductVariantUpsertWithoutCartItemsInput.schema';
import { ProductVariantWhereUniqueInputObjectSchema as ProductVariantWhereUniqueInputObjectSchema } from './ProductVariantWhereUniqueInput.schema';
import { ProductVariantUpdateToOneWithWhereWithoutCartItemsInputObjectSchema as ProductVariantUpdateToOneWithWhereWithoutCartItemsInputObjectSchema } from './ProductVariantUpdateToOneWithWhereWithoutCartItemsInput.schema';
import { ProductVariantUpdateWithoutCartItemsInputObjectSchema as ProductVariantUpdateWithoutCartItemsInputObjectSchema } from './ProductVariantUpdateWithoutCartItemsInput.schema';
import { ProductVariantUncheckedUpdateWithoutCartItemsInputObjectSchema as ProductVariantUncheckedUpdateWithoutCartItemsInputObjectSchema } from './ProductVariantUncheckedUpdateWithoutCartItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductVariantCreateWithoutCartItemsInputObjectSchema), z.lazy(() => ProductVariantUncheckedCreateWithoutCartItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductVariantCreateOrConnectWithoutCartItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => ProductVariantUpsertWithoutCartItemsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductVariantWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ProductVariantUpdateToOneWithWhereWithoutCartItemsInputObjectSchema), z.lazy(() => ProductVariantUpdateWithoutCartItemsInputObjectSchema), z.lazy(() => ProductVariantUncheckedUpdateWithoutCartItemsInputObjectSchema)]).optional()
}).strict();
export const ProductVariantUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema: z.ZodType<Prisma.ProductVariantUpdateOneRequiredWithoutCartItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantUpdateOneRequiredWithoutCartItemsNestedInput>;
export const ProductVariantUpdateOneRequiredWithoutCartItemsNestedInputObjectZodSchema = makeSchema();
