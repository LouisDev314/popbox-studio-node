import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusHistoryScalarWhereInputObjectSchema as PaymentStatusHistoryScalarWhereInputObjectSchema } from './PaymentStatusHistoryScalarWhereInput.schema';
import { PaymentStatusHistoryUpdateManyMutationInputObjectSchema as PaymentStatusHistoryUpdateManyMutationInputObjectSchema } from './PaymentStatusHistoryUpdateManyMutationInput.schema';
import { PaymentStatusHistoryUncheckedUpdateManyWithoutPaymentInputObjectSchema as PaymentStatusHistoryUncheckedUpdateManyWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryUncheckedUpdateManyWithoutPaymentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PaymentStatusHistoryScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PaymentStatusHistoryUpdateManyMutationInputObjectSchema), z.lazy(() => PaymentStatusHistoryUncheckedUpdateManyWithoutPaymentInputObjectSchema)])
}).strict();
export const PaymentStatusHistoryUpdateManyWithWhereWithoutPaymentInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryUpdateManyWithWhereWithoutPaymentInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryUpdateManyWithWhereWithoutPaymentInput>;
export const PaymentStatusHistoryUpdateManyWithWhereWithoutPaymentInputObjectZodSchema = makeSchema();
