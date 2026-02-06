import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusHistoryCreateWithoutOrderInputObjectSchema as OrderStatusHistoryCreateWithoutOrderInputObjectSchema } from './OrderStatusHistoryCreateWithoutOrderInput.schema';
import { OrderStatusHistoryUncheckedCreateWithoutOrderInputObjectSchema as OrderStatusHistoryUncheckedCreateWithoutOrderInputObjectSchema } from './OrderStatusHistoryUncheckedCreateWithoutOrderInput.schema';
import { OrderStatusHistoryCreateOrConnectWithoutOrderInputObjectSchema as OrderStatusHistoryCreateOrConnectWithoutOrderInputObjectSchema } from './OrderStatusHistoryCreateOrConnectWithoutOrderInput.schema';
import { OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInputObjectSchema as OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInputObjectSchema } from './OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInput.schema';
import { OrderStatusHistoryCreateManyOrderInputEnvelopeObjectSchema as OrderStatusHistoryCreateManyOrderInputEnvelopeObjectSchema } from './OrderStatusHistoryCreateManyOrderInputEnvelope.schema';
import { OrderStatusHistoryWhereUniqueInputObjectSchema as OrderStatusHistoryWhereUniqueInputObjectSchema } from './OrderStatusHistoryWhereUniqueInput.schema';
import { OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInputObjectSchema as OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInputObjectSchema } from './OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInput.schema';
import { OrderStatusHistoryUpdateManyWithWhereWithoutOrderInputObjectSchema as OrderStatusHistoryUpdateManyWithWhereWithoutOrderInputObjectSchema } from './OrderStatusHistoryUpdateManyWithWhereWithoutOrderInput.schema';
import { OrderStatusHistoryScalarWhereInputObjectSchema as OrderStatusHistoryScalarWhereInputObjectSchema } from './OrderStatusHistoryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrderStatusHistoryCreateWithoutOrderInputObjectSchema), z.lazy(() => OrderStatusHistoryCreateWithoutOrderInputObjectSchema).array(), z.lazy(() => OrderStatusHistoryUncheckedCreateWithoutOrderInputObjectSchema), z.lazy(() => OrderStatusHistoryUncheckedCreateWithoutOrderInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OrderStatusHistoryCreateOrConnectWithoutOrderInputObjectSchema), z.lazy(() => OrderStatusHistoryCreateOrConnectWithoutOrderInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInputObjectSchema), z.lazy(() => OrderStatusHistoryUpsertWithWhereUniqueWithoutOrderInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OrderStatusHistoryCreateManyOrderInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema), z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema), z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema), z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema), z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInputObjectSchema), z.lazy(() => OrderStatusHistoryUpdateWithWhereUniqueWithoutOrderInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => OrderStatusHistoryUpdateManyWithWhereWithoutOrderInputObjectSchema), z.lazy(() => OrderStatusHistoryUpdateManyWithWhereWithoutOrderInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => OrderStatusHistoryScalarWhereInputObjectSchema), z.lazy(() => OrderStatusHistoryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInput>;
export const OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInputObjectZodSchema = makeSchema();
