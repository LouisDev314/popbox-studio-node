import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema';
import { ProductCreateWithoutCollectionsInputObjectSchema as ProductCreateWithoutCollectionsInputObjectSchema } from './ProductCreateWithoutCollectionsInput.schema';
import { ProductUncheckedCreateWithoutCollectionsInputObjectSchema as ProductUncheckedCreateWithoutCollectionsInputObjectSchema } from './ProductUncheckedCreateWithoutCollectionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProductWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ProductCreateWithoutCollectionsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCollectionsInputObjectSchema)])
}).strict();
export const ProductCreateOrConnectWithoutCollectionsInputObjectSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutCollectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateOrConnectWithoutCollectionsInput>;
export const ProductCreateOrConnectWithoutCollectionsInputObjectZodSchema = makeSchema();
