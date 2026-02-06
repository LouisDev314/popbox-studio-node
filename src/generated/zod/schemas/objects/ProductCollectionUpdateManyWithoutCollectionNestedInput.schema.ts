import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionCreateWithoutCollectionInputObjectSchema as ProductCollectionCreateWithoutCollectionInputObjectSchema } from './ProductCollectionCreateWithoutCollectionInput.schema';
import { ProductCollectionUncheckedCreateWithoutCollectionInputObjectSchema as ProductCollectionUncheckedCreateWithoutCollectionInputObjectSchema } from './ProductCollectionUncheckedCreateWithoutCollectionInput.schema';
import { ProductCollectionCreateOrConnectWithoutCollectionInputObjectSchema as ProductCollectionCreateOrConnectWithoutCollectionInputObjectSchema } from './ProductCollectionCreateOrConnectWithoutCollectionInput.schema';
import { ProductCollectionUpsertWithWhereUniqueWithoutCollectionInputObjectSchema as ProductCollectionUpsertWithWhereUniqueWithoutCollectionInputObjectSchema } from './ProductCollectionUpsertWithWhereUniqueWithoutCollectionInput.schema';
import { ProductCollectionCreateManyCollectionInputEnvelopeObjectSchema as ProductCollectionCreateManyCollectionInputEnvelopeObjectSchema } from './ProductCollectionCreateManyCollectionInputEnvelope.schema';
import { ProductCollectionWhereUniqueInputObjectSchema as ProductCollectionWhereUniqueInputObjectSchema } from './ProductCollectionWhereUniqueInput.schema';
import { ProductCollectionUpdateWithWhereUniqueWithoutCollectionInputObjectSchema as ProductCollectionUpdateWithWhereUniqueWithoutCollectionInputObjectSchema } from './ProductCollectionUpdateWithWhereUniqueWithoutCollectionInput.schema';
import { ProductCollectionUpdateManyWithWhereWithoutCollectionInputObjectSchema as ProductCollectionUpdateManyWithWhereWithoutCollectionInputObjectSchema } from './ProductCollectionUpdateManyWithWhereWithoutCollectionInput.schema';
import { ProductCollectionScalarWhereInputObjectSchema as ProductCollectionScalarWhereInputObjectSchema } from './ProductCollectionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCollectionCreateWithoutCollectionInputObjectSchema), z.lazy(() => ProductCollectionCreateWithoutCollectionInputObjectSchema).array(), z.lazy(() => ProductCollectionUncheckedCreateWithoutCollectionInputObjectSchema), z.lazy(() => ProductCollectionUncheckedCreateWithoutCollectionInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductCollectionCreateOrConnectWithoutCollectionInputObjectSchema), z.lazy(() => ProductCollectionCreateOrConnectWithoutCollectionInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ProductCollectionUpsertWithWhereUniqueWithoutCollectionInputObjectSchema), z.lazy(() => ProductCollectionUpsertWithWhereUniqueWithoutCollectionInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductCollectionCreateManyCollectionInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema), z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema), z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema), z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema), z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ProductCollectionUpdateWithWhereUniqueWithoutCollectionInputObjectSchema), z.lazy(() => ProductCollectionUpdateWithWhereUniqueWithoutCollectionInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ProductCollectionUpdateManyWithWhereWithoutCollectionInputObjectSchema), z.lazy(() => ProductCollectionUpdateManyWithWhereWithoutCollectionInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ProductCollectionScalarWhereInputObjectSchema), z.lazy(() => ProductCollectionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ProductCollectionUpdateManyWithoutCollectionNestedInputObjectSchema: z.ZodType<Prisma.ProductCollectionUpdateManyWithoutCollectionNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionUpdateManyWithoutCollectionNestedInput>;
export const ProductCollectionUpdateManyWithoutCollectionNestedInputObjectZodSchema = makeSchema();
