import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  fromStatus: PaymentStatusSchema.optional().nullable(),
  toStatus: PaymentStatusSchema,
  reason: z.string().optional().nullable(),
  stripeEventId: z.string().max(255).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();
export const PaymentStatusHistoryCreateWithoutPaymentInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryCreateWithoutPaymentInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryCreateWithoutPaymentInput>;
export const PaymentStatusHistoryCreateWithoutPaymentInputObjectZodSchema = makeSchema();
