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
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const PaymentStatusHistoryCountAggregateInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryCountAggregateInputType>;
export const PaymentStatusHistoryCountAggregateInputObjectZodSchema = makeSchema();
