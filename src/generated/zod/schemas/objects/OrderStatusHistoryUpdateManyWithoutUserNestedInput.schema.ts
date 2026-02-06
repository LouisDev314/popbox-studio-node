import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusHistoryCreateWithoutUserInputObjectSchema as OrderStatusHistoryCreateWithoutUserInputObjectSchema } from './OrderStatusHistoryCreateWithoutUserInput.schema';
import { OrderStatusHistoryUncheckedCreateWithoutUserInputObjectSchema as OrderStatusHistoryUncheckedCreateWithoutUserInputObjectSchema } from './OrderStatusHistoryUncheckedCreateWithoutUserInput.schema';
import { OrderStatusHistoryCreateOrConnectWithoutUserInputObjectSchema as OrderStatusHistoryCreateOrConnectWithoutUserInputObjectSchema } from './OrderStatusHistoryCreateOrConnectWithoutUserInput.schema';
import { OrderStatusHistoryUpsertWithWhereUniqueWithoutUserInputObjectSchema as OrderStatusHistoryUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './OrderStatusHistoryUpsertWithWhereUniqueWithoutUserInput.schema';
import { OrderStatusHistoryCreateManyUserInputEnvelopeObjectSchema as OrderStatusHistoryCreateManyUserInputEnvelopeObjectSchema } from './OrderStatusHistoryCreateManyUserInputEnvelope.schema';
import { OrderStatusHistoryWhereUniqueInputObjectSchema as OrderStatusHistoryWhereUniqueInputObjectSchema } from './OrderStatusHistoryWhereUniqueInput.schema';
import { OrderStatusHistoryUpdateWithWhereUniqueWithoutUserInputObjectSchema as OrderStatusHistoryUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './OrderStatusHistoryUpdateWithWhereUniqueWithoutUserInput.schema';
import { OrderStatusHistoryUpdateManyWithWhereWithoutUserInputObjectSchema as OrderStatusHistoryUpdateManyWithWhereWithoutUserInputObjectSchema } from './OrderStatusHistoryUpdateManyWithWhereWithoutUserInput.schema';
import { OrderStatusHistoryScalarWhereInputObjectSchema as OrderStatusHistoryScalarWhereInputObjectSchema } from './OrderStatusHistoryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrderStatusHistoryCreateWithoutUserInputObjectSchema), z.lazy(() => OrderStatusHistoryCreateWithoutUserInputObjectSchema).array(), z.lazy(() => OrderStatusHistoryUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => OrderStatusHistoryUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OrderStatusHistoryCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => OrderStatusHistoryCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => OrderStatusHistoryUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => OrderStatusHistoryUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OrderStatusHistoryCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema), z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema), z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema), z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema), z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => OrderStatusHistoryUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => OrderStatusHistoryUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => OrderStatusHistoryUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => OrderStatusHistoryUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => OrderStatusHistoryScalarWhereInputObjectSchema), z.lazy(() => OrderStatusHistoryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const OrderStatusHistoryUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryUpdateManyWithoutUserNestedInput>;
export const OrderStatusHistoryUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
