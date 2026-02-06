import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionWhereUniqueInputObjectSchema as ProductCollectionWhereUniqueInputObjectSchema } from './ProductCollectionWhereUniqueInput.schema';
import { ProductCollectionCreateWithoutCollectionInputObjectSchema as ProductCollectionCreateWithoutCollectionInputObjectSchema } from './ProductCollectionCreateWithoutCollectionInput.schema';
import { ProductCollectionUncheckedCreateWithoutCollectionInputObjectSchema as ProductCollectionUncheckedCreateWithoutCollectionInputObjectSchema } from './ProductCollectionUncheckedCreateWithoutCollectionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductCollectionCreateWithoutCollectionInputObjectSchema), z.lazy(() => ProductCollectionUncheckedCreateWithoutCollectionInputObjectSchema)])
}).strict();
export const ProductCollectionCreateOrConnectWithoutCollectionInputObjectSchema: z.ZodType<Prisma.ProductCollectionCreateOrConnectWithoutCollectionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionCreateOrConnectWithoutCollectionInput>;
export const ProductCollectionCreateOrConnectWithoutCollectionInputObjectZodSchema = makeSchema();
