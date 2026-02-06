import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionWhereUniqueInputObjectSchema as ProductCollectionWhereUniqueInputObjectSchema } from './ProductCollectionWhereUniqueInput.schema';
import { ProductCollectionCreateWithoutProductInputObjectSchema as ProductCollectionCreateWithoutProductInputObjectSchema } from './ProductCollectionCreateWithoutProductInput.schema';
import { ProductCollectionUncheckedCreateWithoutProductInputObjectSchema as ProductCollectionUncheckedCreateWithoutProductInputObjectSchema } from './ProductCollectionUncheckedCreateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductCollectionCreateWithoutProductInputObjectSchema), z.lazy(() => ProductCollectionUncheckedCreateWithoutProductInputObjectSchema)])
}).strict();
export const ProductCollectionCreateOrConnectWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductCollectionCreateOrConnectWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionCreateOrConnectWithoutProductInput>;
export const ProductCollectionCreateOrConnectWithoutProductInputObjectZodSchema = makeSchema();
