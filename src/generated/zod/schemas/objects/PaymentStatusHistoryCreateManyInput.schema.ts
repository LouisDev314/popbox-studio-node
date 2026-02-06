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
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();
export const PaymentStatusHistoryCreateManyInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryCreateManyInput>;
export const PaymentStatusHistoryCreateManyInputObjectZodSchema = makeSchema();
