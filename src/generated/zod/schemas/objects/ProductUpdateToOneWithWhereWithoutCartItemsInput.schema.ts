import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { ProductUpdateWithoutCartItemsInputObjectSchema as ProductUpdateWithoutCartItemsInputObjectSchema } from './ProductUpdateWithoutCartItemsInput.schema';
import { ProductUncheckedUpdateWithoutCartItemsInputObjectSchema as ProductUncheckedUpdateWithoutCartItemsInputObjectSchema } from './ProductUncheckedUpdateWithoutCartItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ProductUpdateWithoutCartItemsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutCartItemsInputObjectSchema)])
}).strict();
export const ProductUpdateToOneWithWhereWithoutCartItemsInputObjectSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutCartItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutCartItemsInput>;
export const ProductUpdateToOneWithWhereWithoutCartItemsInputObjectZodSchema = makeSchema();
