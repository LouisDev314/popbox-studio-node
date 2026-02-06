import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCreateWithoutCollectionsInputObjectSchema as ProductCreateWithoutCollectionsInputObjectSchema } from './ProductCreateWithoutCollectionsInput.schema';
import { ProductUncheckedCreateWithoutCollectionsInputObjectSchema as ProductUncheckedCreateWithoutCollectionsInputObjectSchema } from './ProductUncheckedCreateWithoutCollectionsInput.schema';
import { ProductCreateOrConnectWithoutCollectionsInputObjectSchema as ProductCreateOrConnectWithoutCollectionsInputObjectSchema } from './ProductCreateOrConnectWithoutCollectionsInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './ProductWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCreateWithoutCollectionsInputObjectSchema), z.lazy(() => ProductUncheckedCreateWithoutCollectionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutCollectionsInputObjectSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputObjectSchema).optional()
}).strict();
export const ProductCreateNestedOneWithoutCollectionsInputObjectSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutCollectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateNestedOneWithoutCollectionsInput>;
export const ProductCreateNestedOneWithoutCollectionsInputObjectZodSchema = makeSchema();
