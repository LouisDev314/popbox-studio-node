import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductUpdateWithoutCollectionsInputObjectSchema as ProductUpdateWithoutCollectionsInputObjectSchema } from './ProductUpdateWithoutCollectionsInput.schema';
import { ProductUncheckedUpdateWithoutCollectionsInputObjectSchema as ProductUncheckedUpdateWithoutCollectionsInputObjectSchema } from './ProductUncheckedUpdateWithoutCollectionsInput.schema';
import { ProductCreateWithoutCollectionsInputObjectSchema as ProductCreateWithoutCollectionsInputObjectSchema } from './ProductCreateWithoutCollectionsInput.schema';
import { ProductUncheckedCreateWithoutCollectionsInputObjectSchema as ProductUncheckedCreateWithoutCollectionsInputObjectSchema } from './ProductUncheckedCreateWithoutCollectionsInput.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ProductUpdateWithoutCollectionsInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutCollectionsInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductCreateWithoutCollectionsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCollectionsInputObjectSchema)]),
  where: z.lazy(() => ProductWhereInputObjectSchema).optional()
}).strict();
export const ProductUpsertWithoutCollectionsInputObjectSchema: z.ZodType<Prisma.ProductUpsertWithoutCollectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpsertWithoutCollectionsInput>;
export const ProductUpsertWithoutCollectionsInputObjectZodSchema = makeSchema();
