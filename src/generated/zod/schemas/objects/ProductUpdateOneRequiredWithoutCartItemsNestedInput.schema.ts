import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateWithoutCartItemsInputObjectSchema as ProductCreateWithoutCartItemsInputObjectSchema } from './ProductCreateWithoutCartItemsInput.schema';
import { ProductUncheckedCreateWithoutCartItemsInputObjectSchema as ProductUncheckedCreateWithoutCartItemsInputObjectSchema } from './ProductUncheckedCreateWithoutCartItemsInput.schema';
import { ProductCreateOrConnectWithoutCartItemsInputObjectSchema as ProductCreateOrConnectWithoutCartItemsInputObjectSchema } from './ProductCreateOrConnectWithoutCartItemsInput.schema';
import { ProductUpsertWithoutCartItemsInputObjectSchema as ProductUpsertWithoutCartItemsInputObjectSchema } from './ProductUpsertWithoutCartItemsInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductUpdateToOneWithWhereWithoutCartItemsInputObjectSchema as ProductUpdateToOneWithWhereWithoutCartItemsInputObjectSchema } from './ProductUpdateToOneWithWhereWithoutCartItemsInput.schema';
import { ProductUpdateWithoutCartItemsInputObjectSchema as ProductUpdateWithoutCartItemsInputObjectSchema } from './ProductUpdateWithoutCartItemsInput.schema';
import { ProductUncheckedUpdateWithoutCartItemsInputObjectSchema as ProductUncheckedUpdateWithoutCartItemsInputObjectSchema } from './ProductUncheckedUpdateWithoutCartItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutCartItemsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCartItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutCartItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutCartItemsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => ProductUpdateToOneWithWhereWithoutCartItemsInputObjectSchema), z.lazy(() => ProductUpdateWithoutCartItemsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutCartItemsInputObjectSchema)]).optional()
}).strict();
export const ProductUpdateOneRequiredWithoutCartItemsNestedInputObjectSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutCartItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateOneRequiredWithoutCartItemsNestedInput>;
export const ProductUpdateOneRequiredWithoutCartItemsNestedInputObjectZodSchema = makeSchema();
