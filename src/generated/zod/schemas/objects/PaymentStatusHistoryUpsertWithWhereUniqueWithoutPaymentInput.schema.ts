import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusHistoryWhereUniqueInputObjectSchema as PaymentStatusHistoryWhereUniqueInputObjectSchema } from './PaymentStatusHistoryWhereUniqueInput.schema';
import { PaymentStatusHistoryUpdateWithoutPaymentInputObjectSchema as PaymentStatusHistoryUpdateWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryUpdateWithoutPaymentInput.schema';
import { PaymentStatusHistoryUncheckedUpdateWithoutPaymentInputObjectSchema as PaymentStatusHistoryUncheckedUpdateWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryUncheckedUpdateWithoutPaymentInput.schema';
import { PaymentStatusHistoryCreateWithoutPaymentInputObjectSchema as PaymentStatusHistoryCreateWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryCreateWithoutPaymentInput.schema';
import { PaymentStatusHistoryUncheckedCreateWithoutPaymentInputObjectSchema as PaymentStatusHistoryUncheckedCreateWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryUncheckedCreateWithoutPaymentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentStatusHistoryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PaymentStatusHistoryUpdateWithoutPaymentInputObjectSchema), z.lazy(() => PaymentStatusHistoryUncheckedUpdateWithoutPaymentInputObjectSchema)]),
  create: z.union([z.lazy(() => PaymentStatusHistoryCreateWithoutPaymentInputObjectSchema), z.lazy(() => PaymentStatusHistoryUncheckedCreateWithoutPaymentInputObjectSchema)])
}).strict();
export const PaymentStatusHistoryUpsertWithWhereUniqueWithoutPaymentInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryUpsertWithWhereUniqueWithoutPaymentInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryUpsertWithWhereUniqueWithoutPaymentInput>;
export const PaymentStatusHistoryUpsertWithWhereUniqueWithoutPaymentInputObjectZodSchema = makeSchema();
