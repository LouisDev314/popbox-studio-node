import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusHistoryWhereUniqueInputObjectSchema as PaymentStatusHistoryWhereUniqueInputObjectSchema } from './PaymentStatusHistoryWhereUniqueInput.schema';
import { PaymentStatusHistoryUpdateWithoutPaymentInputObjectSchema as PaymentStatusHistoryUpdateWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryUpdateWithoutPaymentInput.schema';
import { PaymentStatusHistoryUncheckedUpdateWithoutPaymentInputObjectSchema as PaymentStatusHistoryUncheckedUpdateWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryUncheckedUpdateWithoutPaymentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentStatusHistoryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PaymentStatusHistoryUpdateWithoutPaymentInputObjectSchema), z.lazy(() => PaymentStatusHistoryUncheckedUpdateWithoutPaymentInputObjectSchema)])
}).strict();
export const PaymentStatusHistoryUpdateWithWhereUniqueWithoutPaymentInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryUpdateWithWhereUniqueWithoutPaymentInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryUpdateWithWhereUniqueWithoutPaymentInput>;
export const PaymentStatusHistoryUpdateWithWhereUniqueWithoutPaymentInputObjectZodSchema = makeSchema();
