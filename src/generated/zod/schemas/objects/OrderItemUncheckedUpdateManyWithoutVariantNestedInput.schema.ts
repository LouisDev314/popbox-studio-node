import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderItemCreateWithoutVariantInputObjectSchema as OrderItemCreateWithoutVariantInputObjectSchema } from './OrderItemCreateWithoutVariantInput.schema';
import { OrderItemUncheckedCreateWithoutVariantInputObjectSchema as OrderItemUncheckedCreateWithoutVariantInputObjectSchema } from './OrderItemUncheckedCreateWithoutVariantInput.schema';
import { OrderItemCreateOrConnectWithoutVariantInputObjectSchema as OrderItemCreateOrConnectWithoutVariantInputObjectSchema } from './OrderItemCreateOrConnectWithoutVariantInput.schema';
import { OrderItemUpsertWithWhereUniqueWithoutVariantInputObjectSchema as OrderItemUpsertWithWhereUniqueWithoutVariantInputObjectSchema } from './OrderItemUpsertWithWhereUniqueWithoutVariantInput.schema';
import { OrderItemCreateManyVariantInputEnvelopeObjectSchema as OrderItemCreateManyVariantInputEnvelopeObjectSchema } from './OrderItemCreateManyVariantInputEnvelope.schema';
import { OrderItemWhereUniqueInputObjectSchema as OrderItemWhereUniqueInputObjectSchema } from './OrderItemWhereUniqueInput.schema';
import { OrderItemUpdateWithWhereUniqueWithoutVariantInputObjectSchema as OrderItemUpdateWithWhereUniqueWithoutVariantInputObjectSchema } from './OrderItemUpdateWithWhereUniqueWithoutVariantInput.schema';
import { OrderItemUpdateManyWithWhereWithoutVariantInputObjectSchema as OrderItemUpdateManyWithWhereWithoutVariantInputObjectSchema } from './OrderItemUpdateManyWithWhereWithoutVariantInput.schema';
import { OrderItemScalarWhereInputObjectSchema as OrderItemScalarWhereInputObjectSchema } from './OrderItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrderItemCreateWithoutVariantInputObjectSchema), z.lazy(() => OrderItemCreateWithoutVariantInputObjectSchema).array(), z.lazy(() => OrderItemUncheckedCreateWithoutVariantInputObjectSchema), z.lazy(() => OrderItemUncheckedCreateWithoutVariantInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OrderItemCreateOrConnectWithoutVariantInputObjectSchema), z.lazy(() => OrderItemCreateOrConnectWithoutVariantInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => OrderItemUpsertWithWhereUniqueWithoutVariantInputObjectSchema), z.lazy(() => OrderItemUpsertWithWhereUniqueWithoutVariantInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OrderItemCreateManyVariantInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => OrderItemWhereUniqueInputObjectSchema), z.lazy(() => OrderItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => OrderItemWhereUniqueInputObjectSchema), z.lazy(() => OrderItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => OrderItemWhereUniqueInputObjectSchema), z.lazy(() => OrderItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => OrderItemWhereUniqueInputObjectSchema), z.lazy(() => OrderItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => OrderItemUpdateWithWhereUniqueWithoutVariantInputObjectSchema), z.lazy(() => OrderItemUpdateWithWhereUniqueWithoutVariantInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => OrderItemUpdateManyWithWhereWithoutVariantInputObjectSchema), z.lazy(() => OrderItemUpdateManyWithWhereWithoutVariantInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => OrderItemScalarWhereInputObjectSchema), z.lazy(() => OrderItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const OrderItemUncheckedUpdateManyWithoutVariantNestedInputObjectSchema: z.ZodType<Prisma.OrderItemUncheckedUpdateManyWithoutVariantNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemUncheckedUpdateManyWithoutVariantNestedInput>;
export const OrderItemUncheckedUpdateManyWithoutVariantNestedInputObjectZodSchema = makeSchema();
