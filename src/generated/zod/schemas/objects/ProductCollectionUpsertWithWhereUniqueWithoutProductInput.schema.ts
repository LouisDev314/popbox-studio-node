import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionWhereUniqueInputObjectSchema as ProductCollectionWhereUniqueInputObjectSchema } from './ProductCollectionWhereUniqueInput.schema';
import { ProductCollectionUpdateWithoutProductInputObjectSchema as ProductCollectionUpdateWithoutProductInputObjectSchema } from './ProductCollectionUpdateWithoutProductInput.schema';
import { ProductCollectionUncheckedUpdateWithoutProductInputObjectSchema as ProductCollectionUncheckedUpdateWithoutProductInputObjectSchema } from './ProductCollectionUncheckedUpdateWithoutProductInput.schema';
import { ProductCollectionCreateWithoutProductInputObjectSchema as ProductCollectionCreateWithoutProductInputObjectSchema } from './ProductCollectionCreateWithoutProductInput.schema';
import { ProductCollectionUncheckedCreateWithoutProductInputObjectSchema as ProductCollectionUncheckedCreateWithoutProductInputObjectSchema } from './ProductCollectionUncheckedCreateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ProductCollectionUpdateWithoutProductInputObjectSchema), z.lazy(() => ProductCollectionUncheckedUpdateWithoutProductInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductCollectionCreateWithoutProductInputObjectSchema), z.lazy(() => ProductCollectionUncheckedCreateWithoutProductInputObjectSchema)])
}).strict();
export const ProductCollectionUpsertWithWhereUniqueWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductCollectionUpsertWithWhereUniqueWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionUpsertWithWhereUniqueWithoutProductInput>;
export const ProductCollectionUpsertWithWhereUniqueWithoutProductInputObjectZodSchema = makeSchema();
