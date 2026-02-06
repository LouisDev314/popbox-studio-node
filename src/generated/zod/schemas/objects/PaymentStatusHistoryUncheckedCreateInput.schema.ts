import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  paymentId: z.string(),
  fromStatus: PaymentStatusSchema.optional().nullable(),
  toStatus: PaymentStatusSchema,
  reason: z.string().optional().nullable(),
  stripeEventId: z.string().max(255).optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const PaymentStatusHistoryUncheckedCreateInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryUncheckedCreateInput>;
export const PaymentStatusHistoryUncheckedCreateInputObjectZodSchema = makeSchema();
