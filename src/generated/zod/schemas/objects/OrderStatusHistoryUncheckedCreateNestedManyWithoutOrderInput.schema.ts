import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusHistoryCreateWithoutOrderInputObjectSchema as OrderStatusHistoryCreateWithoutOrderInputObjectSchema } from './OrderStatusHistoryCreateWithoutOrderInput.schema';
import { OrderStatusHistoryUncheckedCreateWithoutOrderInputObjectSchema as OrderStatusHistoryUncheckedCreateWithoutOrderInputObjectSchema } from './OrderStatusHistoryUncheckedCreateWithoutOrderInput.schema';
import { OrderStatusHistoryCreateOrConnectWithoutOrderInputObjectSchema as OrderStatusHistoryCreateOrConnectWithoutOrderInputObjectSchema } from './OrderStatusHistoryCreateOrConnectWithoutOrderInput.schema';
import { OrderStatusHistoryCreateManyOrderInputEnvelopeObjectSchema as OrderStatusHistoryCreateManyOrderInputEnvelopeObjectSchema } from './OrderStatusHistoryCreateManyOrderInputEnvelope.schema';
import { OrderStatusHistoryWhereUniqueInputObjectSchema as OrderStatusHistoryWhereUniqueInputObjectSchema } from './OrderStatusHistoryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrderStatusHistoryCreateWithoutOrderInputObjectSchema), z.lazy(() => OrderStatusHistoryCreateWithoutOrderInputObjectSchema).array(), z.lazy(() => OrderStatusHistoryUncheckedCreateWithoutOrderInputObjectSchema), z.lazy(() => OrderStatusHistoryUncheckedCreateWithoutOrderInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OrderStatusHistoryCreateOrConnectWithoutOrderInputObjectSchema), z.lazy(() => OrderStatusHistoryCreateOrConnectWithoutOrderInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OrderStatusHistoryCreateManyOrderInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema), z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInput>;
export const OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInputObjectZodSchema = makeSchema();
