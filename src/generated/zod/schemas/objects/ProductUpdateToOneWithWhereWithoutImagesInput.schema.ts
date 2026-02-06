import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './ProductWhereInput.schema';
import { ProductUpdateWithoutImagesInputObjectSchema as ProductUpdateWithoutImagesInputObjectSchema } from './ProductUpdateWithoutImagesInput.schema';
import { ProductUncheckedUpdateWithoutImagesInputObjectSchema as ProductUncheckedUpdateWithoutImagesInputObjectSchema } from './ProductUncheckedUpdateWithoutImagesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => ProductUpdateWithoutImagesInputObjectSchema), z.lazy(() => ProductUncheckedUpdateWithoutImagesInputObjectSchema)])
}).strict();
export const ProductUpdateToOneWithWhereWithoutImagesInputObjectSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutImagesInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutImagesInput>;
export const ProductUpdateToOneWithWhereWithoutImagesInputObjectZodSchema = makeSchema();
