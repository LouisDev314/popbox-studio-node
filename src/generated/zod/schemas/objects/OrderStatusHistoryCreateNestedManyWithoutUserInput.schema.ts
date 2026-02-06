import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusHistoryCreateWithoutUserInputObjectSchema as OrderStatusHistoryCreateWithoutUserInputObjectSchema } from './OrderStatusHistoryCreateWithoutUserInput.schema';
import { OrderStatusHistoryUncheckedCreateWithoutUserInputObjectSchema as OrderStatusHistoryUncheckedCreateWithoutUserInputObjectSchema } from './OrderStatusHistoryUncheckedCreateWithoutUserInput.schema';
import { OrderStatusHistoryCreateOrConnectWithoutUserInputObjectSchema as OrderStatusHistoryCreateOrConnectWithoutUserInputObjectSchema } from './OrderStatusHistoryCreateOrConnectWithoutUserInput.schema';
import { OrderStatusHistoryCreateManyUserInputEnvelopeObjectSchema as OrderStatusHistoryCreateManyUserInputEnvelopeObjectSchema } from './OrderStatusHistoryCreateManyUserInputEnvelope.schema';
import { OrderStatusHistoryWhereUniqueInputObjectSchema as OrderStatusHistoryWhereUniqueInputObjectSchema } from './OrderStatusHistoryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrderStatusHistoryCreateWithoutUserInputObjectSchema), z.lazy(() => OrderStatusHistoryCreateWithoutUserInputObjectSchema).array(), z.lazy(() => OrderStatusHistoryUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => OrderStatusHistoryUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OrderStatusHistoryCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => OrderStatusHistoryCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OrderStatusHistoryCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema), z.lazy(() => OrderStatusHistoryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const OrderStatusHistoryCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryCreateNestedManyWithoutUserInput>;
export const OrderStatusHistoryCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
