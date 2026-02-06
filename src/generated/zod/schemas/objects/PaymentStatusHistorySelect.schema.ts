import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentArgsObjectSchema as PaymentArgsObjectSchema } from './PaymentArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  paymentId: z.boolean().optional(),
  fromStatus: z.boolean().optional(),
  toStatus: z.boolean().optional(),
  reason: z.boolean().optional(),
  stripeEventId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  payment: z.union([z.boolean(), z.lazy(() => PaymentArgsObjectSchema)]).optional()
}).strict();
export const PaymentStatusHistorySelectObjectSchema: z.ZodType<Prisma.PaymentStatusHistorySelect> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistorySelect>;
export const PaymentStatusHistorySelectObjectZodSchema = makeSchema();
