import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { ProductUpdateWithoutCollectionsInputObjectSchema as ProductUpdateWithoutCollectionsInputObjectSchema } from './ProductUpdateWithoutCollectionsInput.schema';
import { ProductUncheckedUpdateWithoutCollectionsInputObjectSchema as ProductUncheckedUpdateWithoutCollectionsInputObjectSchema } from './ProductUncheckedUpdateWithoutCollectionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ProductUpdateWithoutCollectionsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutCollectionsInputObjectSchema)])
}).strict();
export const ProductUpdateToOneWithWhereWithoutCollectionsInputObjectSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutCollectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutCollectionsInput>;
export const ProductUpdateToOneWithWhereWithoutCollectionsInputObjectZodSchema = makeSchema();
