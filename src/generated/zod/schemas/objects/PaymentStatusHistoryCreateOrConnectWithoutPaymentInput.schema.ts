import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusHistoryWhereUniqueInputObjectSchema as PaymentStatusHistoryWhereUniqueInputObjectSchema } from './PaymentStatusHistoryWhereUniqueInput.schema';
import { PaymentStatusHistoryCreateWithoutPaymentInputObjectSchema as PaymentStatusHistoryCreateWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryCreateWithoutPaymentInput.schema';
import { PaymentStatusHistoryUncheckedCreateWithoutPaymentInputObjectSchema as PaymentStatusHistoryUncheckedCreateWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryUncheckedCreateWithoutPaymentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentStatusHistoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PaymentStatusHistoryCreateWithoutPaymentInputObjectSchema), z.lazy(() => PaymentStatusHistoryUncheckedCreateWithoutPaymentInputObjectSchema)])
}).strict();
export const PaymentStatusHistoryCreateOrConnectWithoutPaymentInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryCreateOrConnectWithoutPaymentInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryCreateOrConnectWithoutPaymentInput>;
export const PaymentStatusHistoryCreateOrConnectWithoutPaymentInputObjectZodSchema = makeSchema();
