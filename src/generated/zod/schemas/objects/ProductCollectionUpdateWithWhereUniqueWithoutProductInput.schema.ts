import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionWhereUniqueInputObjectSchema as ProductCollectionWhereUniqueInputObjectSchema } from './ProductCollectionWhereUniqueInput.schema';
import { ProductCollectionUpdateWithoutProductInputObjectSchema as ProductCollectionUpdateWithoutProductInputObjectSchema } from './ProductCollectionUpdateWithoutProductInput.schema';
import { ProductCollectionUncheckedUpdateWithoutProductInputObjectSchema as ProductCollectionUncheckedUpdateWithoutProductInputObjectSchema } from './ProductCollectionUncheckedUpdateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ProductCollectionUpdateWithoutProductInputObjectSchema), z.lazy(() => ProductCollectionUncheckedUpdateWithoutProductInputObjectSchema)])
}).strict();
export const ProductCollectionUpdateWithWhereUniqueWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductCollectionUpdateWithWhereUniqueWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionUpdateWithWhereUniqueWithoutProductInput>;
export const ProductCollectionUpdateWithWhereUniqueWithoutProductInputObjectZodSchema = makeSchema();
