import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionWhereUniqueInputObjectSchema as ProductCollectionWhereUniqueInputObjectSchema } from './ProductCollectionWhereUniqueInput.schema';
import { ProductCollectionUpdateWithoutCollectionInputObjectSchema as ProductCollectionUpdateWithoutCollectionInputObjectSchema } from './ProductCollectionUpdateWithoutCollectionInput.schema';
import { ProductCollectionUncheckedUpdateWithoutCollectionInputObjectSchema as ProductCollectionUncheckedUpdateWithoutCollectionInputObjectSchema } from './ProductCollectionUncheckedUpdateWithoutCollectionInput.schema';
import { ProductCollectionCreateWithoutCollectionInputObjectSchema as ProductCollectionCreateWithoutCollectionInputObjectSchema } from './ProductCollectionCreateWithoutCollectionInput.schema';
import { ProductCollectionUncheckedCreateWithoutCollectionInputObjectSchema as ProductCollectionUncheckedCreateWithoutCollectionInputObjectSchema } from './ProductCollectionUncheckedCreateWithoutCollectionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ProductCollectionUpdateWithoutCollectionInputObjectSchema), z.lazy(() => ProductCollectionUncheckedUpdateWithoutCollectionInputObjectSchema)]),
  create: z.union([z.lazy(() => ProductCollectionCreateWithoutCollectionInputObjectSchema), z.lazy(() => ProductCollectionUncheckedCreateWithoutCollectionInputObjectSchema)])
}).strict();
export const ProductCollectionUpsertWithWhereUniqueWithoutCollectionInputObjectSchema: z.ZodType<Prisma.ProductCollectionUpsertWithWhereUniqueWithoutCollectionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionUpsertWithWhereUniqueWithoutCollectionInput>;
export const ProductCollectionUpsertWithWhereUniqueWithoutCollectionInputObjectZodSchema = makeSchema();
