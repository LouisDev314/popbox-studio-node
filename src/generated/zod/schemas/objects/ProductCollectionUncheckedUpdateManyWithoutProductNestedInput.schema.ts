import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionCreateWithoutProductInputObjectSchema as ProductCollectionCreateWithoutProductInputObjectSchema } from './ProductCollectionCreateWithoutProductInput.schema';
import { ProductCollectionUncheckedCreateWithoutProductInputObjectSchema as ProductCollectionUncheckedCreateWithoutProductInputObjectSchema } from './ProductCollectionUncheckedCreateWithoutProductInput.schema';
import { ProductCollectionCreateOrConnectWithoutProductInputObjectSchema as ProductCollectionCreateOrConnectWithoutProductInputObjectSchema } from './ProductCollectionCreateOrConnectWithoutProductInput.schema';
import { ProductCollectionUpsertWithWhereUniqueWithoutProductInputObjectSchema as ProductCollectionUpsertWithWhereUniqueWithoutProductInputObjectSchema } from './ProductCollectionUpsertWithWhereUniqueWithoutProductInput.schema';
import { ProductCollectionCreateManyProductInputEnvelopeObjectSchema as ProductCollectionCreateManyProductInputEnvelopeObjectSchema } from './ProductCollectionCreateManyProductInputEnvelope.schema';
import { ProductCollectionWhereUniqueInputObjectSchema as ProductCollectionWhereUniqueInputObjectSchema } from './ProductCollectionWhereUniqueInput.schema';
import { ProductCollectionUpdateWithWhereUniqueWithoutProductInputObjectSchema as ProductCollectionUpdateWithWhereUniqueWithoutProductInputObjectSchema } from './ProductCollectionUpdateWithWhereUniqueWithoutProductInput.schema';
import { ProductCollectionUpdateManyWithWhereWithoutProductInputObjectSchema as ProductCollectionUpdateManyWithWhereWithoutProductInputObjectSchema } from './ProductCollectionUpdateManyWithWhereWithoutProductInput.schema';
import { ProductCollectionScalarWhereInputObjectSchema as ProductCollectionScalarWhereInputObjectSchema } from './ProductCollectionScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ProductCollectionCreateWithoutProductInputObjectSchema), z.lazy(() => ProductCollectionCreateWithoutProductInputObjectSchema).array(), z.lazy(() => ProductCollectionUncheckedCreateWithoutProductInputObjectSchema), z.lazy(() => ProductCollectionUncheckedCreateWithoutProductInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ProductCollectionCreateOrConnectWithoutProductInputObjectSchema), z.lazy(() => ProductCollectionCreateOrConnectWithoutProductInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ProductCollectionUpsertWithWhereUniqueWithoutProductInputObjectSchema), z.lazy(() => ProductCollectionUpsertWithWhereUniqueWithoutProductInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ProductCollectionCreateManyProductInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema), z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema), z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema), z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema), z.lazy(() => ProductCollectionWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ProductCollectionUpdateWithWhereUniqueWithoutProductInputObjectSchema), z.lazy(() => ProductCollectionUpdateWithWhereUniqueWithoutProductInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ProductCollectionUpdateManyWithWhereWithoutProductInputObjectSchema), z.lazy(() => ProductCollectionUpdateManyWithWhereWithoutProductInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ProductCollectionScalarWhereInputObjectSchema), z.lazy(() => ProductCollectionScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ProductCollectionUncheckedUpdateManyWithoutProductNestedInputObjectSchema: z.ZodType<Prisma.ProductCollectionUncheckedUpdateManyWithoutProductNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionUncheckedUpdateManyWithoutProductNestedInput>;
export const ProductCollectionUncheckedUpdateManyWithoutProductNestedInputObjectZodSchema = makeSchema();
