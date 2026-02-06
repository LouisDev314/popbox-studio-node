import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionCreateWithoutCollectionInputObjectSchema as ProductCollectionCreateWithoutCollectionInputObjectSchema } from './ProductCollectionCreateWithoutCollectionInput.schema';
import { ProductCollectionUncheckedCreateWithoutCollectionInputObjectSchema as ProductCollectionUncheckedCreateWithoutCollectionInputObjectSchema } from './ProductCollectionUncheckedCreateWithoutCollectionInput.schema';
import { ProductCollectionCreateOrConnectWithoutCollectionInputObjectSchema as ProductCollectionCreateOrConnectWithoutCollectionInputObjectSchema } from './ProductCollectionCreateOrConnectWithoutCollectionInput.schema';
import { ProductCollectionCreateManyCollectionInputEnvelopeObjectSchema as ProductCollectionCreateManyCollectionInputEnvelopeObjectSchema } from './ProductCollectionCreateManyCollectionInputEnvelope.schema';
import { ProductCollectionWhereUniqueInputObjectSchema as ProductCollectionWhereUniqueInputObjectSchema } from './ProductCollectionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCollectionCreateWithoutCollectionInputObjectSchema), z.lazy(() => ProductCollectionCreateWithoutCollectionInputObjectSchema).array(), z.lazy(() => ProductCollectionUncheckedCreateWithoutCollectionInputObjectSchema), z.lazy(() => ProductCollectionUncheckedCreateWithoutCollectionInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductCollectionCreateOrConnectWithoutCollectionInputObjectSchema), z.lazy(() => ProductCollectionCreateOrConnectWithoutCollectionInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductCollectionCreateManyCollectionInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema), z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ProductCollectionUncheckedCreateNestedManyWithoutCollectionInputObjectSchema: z.ZodType<Prisma.ProductCollectionUncheckedCreateNestedManyWithoutCollectionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionUncheckedCreateNestedManyWithoutCollectionInput>;
export const ProductCollectionUncheckedCreateNestedManyWithoutCollectionInputObjectZodSchema = makeSchema();
