import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  paymentId: z.literal(true).optional(),
  fromStatus: z.literal(true).optional(),
  toStatus: z.literal(true).optional(),
  reason: z.literal(true).optional(),
  stripeEventId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const PaymentStatusHistoryMinAggregateInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryMinAggregateInputType>;
export const PaymentStatusHistoryMinAggregateInputObjectZodSchema = makeSchema();
