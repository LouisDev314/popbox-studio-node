import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductUpdateWithoutImagesInputObjectSchema as ProductUpdateWithoutImagesInputObjectSchema } from './ProductUpdateWithoutImagesInput.schema';
import { ProductUncheckedUpdateWithoutImagesInputObjectSchema as ProductUncheckedUpdateWithoutImagesInputObjectSchema } from './ProductUncheckedUpdateWithoutImagesInput.schema';
import { ProductCreateWithoutImagesInputObjectSchema as ProductCreateWithoutImagesInputObjectSchema } from './ProductCreateWithoutImagesInput.schema';
import { ProductUncheckedCreateWithoutImagesInputObjectSchema as ProductUncheckedCreateWithoutImagesInputObjectSchema } from './ProductUncheckedCreateWithoutImagesInput.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ProductUpdateWithoutImagesInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutImagesInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductCreateWithoutImagesInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutImagesInputObjectSchema)]),
  where: z.lazy(() => ProductWhereInputObjectSchema).optional()
}).strict();
export const ProductUpsertWithoutImagesInputObjectSchema: z.ZodType<Prisma.ProductUpsertWithoutImagesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpsertWithoutImagesInput>;
export const ProductUpsertWithoutImagesInputObjectZodSchema = makeSchema();
