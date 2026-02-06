import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusHistoryCreateWithoutPaymentInputObjectSchema as PaymentStatusHistoryCreateWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryCreateWithoutPaymentInput.schema';
import { PaymentStatusHistoryUncheckedCreateWithoutPaymentInputObjectSchema as PaymentStatusHistoryUncheckedCreateWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryUncheckedCreateWithoutPaymentInput.schema';
import { PaymentStatusHistoryCreateOrConnectWithoutPaymentInputObjectSchema as PaymentStatusHistoryCreateOrConnectWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryCreateOrConnectWithoutPaymentInput.schema';
import { PaymentStatusHistoryCreateManyPaymentInputEnvelopeObjectSchema as PaymentStatusHistoryCreateManyPaymentInputEnvelopeObjectSchema } from './PaymentStatusHistoryCreateManyPaymentInputEnvelope.schema';
import { PaymentStatusHistoryWhereUniqueInputObjectSchema as PaymentStatusHistoryWhereUniqueInputObjectSchema } from './PaymentStatusHistoryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PaymentStatusHistoryCreateWithoutPaymentInputObjectSchema), z.lazy(() => PaymentStatusHistoryCreateWithoutPaymentInputObjectSchema).array(), z.lazy(() => PaymentStatusHistoryUncheckedCreateWithoutPaymentInputObjectSchema), z.lazy(() => PaymentStatusHistoryUncheckedCreateWithoutPaymentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PaymentStatusHistoryCreateOrConnectWithoutPaymentInputObjectSchema), z.lazy(() => PaymentStatusHistoryCreateOrConnectWithoutPaymentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PaymentStatusHistoryCreateManyPaymentInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PaymentStatusHistoryWhereUniqueInputObjectSchema), z.lazy(() => PaymentStatusHistoryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PaymentStatusHistoryCreateNestedManyWithoutPaymentInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryCreateNestedManyWithoutPaymentInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryCreateNestedManyWithoutPaymentInput>;
export const PaymentStatusHistoryCreateNestedManyWithoutPaymentInputObjectZodSchema = makeSchema();
