import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionCreateWithoutProductInputObjectSchema as ProductCollectionCreateWithoutProductInputObjectSchema } from './ProductCollectionCreateWithoutProductInput.schema';
import { ProductCollectionUncheckedCreateWithoutProductInputObjectSchema as ProductCollectionUncheckedCreateWithoutProductInputObjectSchema } from './ProductCollectionUncheckedCreateWithoutProductInput.schema';
import { ProductCollectionCreateOrConnectWithoutProductInputObjectSchema as ProductCollectionCreateOrConnectWithoutProductInputObjectSchema } from './ProductCollectionCreateOrConnectWithoutProductInput.schema';
import { ProductCollectionCreateManyProductInputEnvelopeObjectSchema as ProductCollectionCreateManyProductInputEnvelopeObjectSchema } from './ProductCollectionCreateManyProductInputEnvelope.schema';
import { ProductCollectionWhereUniqueInputObjectSchema as ProductCollectionWhereUniqueInputObjectSchema } from './ProductCollectionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCollectionCreateWithoutProductInputObjectSchema), z.lazy(() => ProductCollectionCreateWithoutProductInputObjectSchema).array(), z.lazy(() => ProductCollectionUncheckedCreateWithoutProductInputObjectSchema), z.lazy(() => ProductCollectionUncheckedCreateWithoutProductInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductCollectionCreateOrConnectWithoutProductInputObjectSchema), z.lazy(() => ProductCollectionCreateOrConnectWithoutProductInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductCollectionCreateManyProductInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema), z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ProductCollectionCreateNestedManyWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductCollectionCreateNestedManyWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionCreateNestedManyWithoutProductInput>;
export const ProductCollectionCreateNestedManyWithoutProductInputObjectZodSchema = makeSchema();
