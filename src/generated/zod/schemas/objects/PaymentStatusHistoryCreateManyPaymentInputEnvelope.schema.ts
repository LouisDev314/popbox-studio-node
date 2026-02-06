import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusHistoryCreateManyPaymentInputObjectSchema as PaymentStatusHistoryCreateManyPaymentInputObjectSchema } from './PaymentStatusHistoryCreateManyPaymentInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PaymentStatusHistoryCreateManyPaymentInputObjectSchema), z.lazy(() => PaymentStatusHistoryCreateManyPaymentInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PaymentStatusHistoryCreateManyPaymentInputEnvelopeObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryCreateManyPaymentInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryCreateManyPaymentInputEnvelope>;
export const PaymentStatusHistoryCreateManyPaymentInputEnvelopeObjectZodSchema = makeSchema();
