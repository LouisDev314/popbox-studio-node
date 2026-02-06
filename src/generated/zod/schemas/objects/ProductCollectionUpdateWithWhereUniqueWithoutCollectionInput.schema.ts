import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionWhereUniqueInputObjectSchema as ProductCollectionWhereUniqueInputObjectSchema } from './ProductCollectionWhereUniqueInput.schema';
import { ProductCollectionUpdateWithoutCollectionInputObjectSchema as ProductCollectionUpdateWithoutCollectionInputObjectSchema } from './ProductCollectionUpdateWithoutCollectionInput.schema';
import { ProductCollectionUncheckedUpdateWithoutCollectionInputObjectSchema as ProductCollectionUncheckedUpdateWithoutCollectionInputObjectSchema } from './ProductCollectionUncheckedUpdateWithoutCollectionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ProductCollectionUpdateWithoutCollectionInputObjectSchema), z.lazy(() => ProductCollectionUncheckedUpdateWithoutCollectionInputObjectSchema)])
}).strict();
export const ProductCollectionUpdateWithWhereUniqueWithoutCollectionInputObjectSchema: z.ZodType<Prisma.ProductCollectionUpdateWithWhereUniqueWithoutCollectionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionUpdateWithWhereUniqueWithoutCollectionInput>;
export const ProductCollectionUpdateWithWhereUniqueWithoutCollectionInputObjectZodSchema = makeSchema();
