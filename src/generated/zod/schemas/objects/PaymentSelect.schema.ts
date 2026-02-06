import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderArgsObjectSchema as OrderArgsObjectSchema } from './OrderArgs.schema';
import { PaymentStatusHistoryFindManySchema as PaymentStatusHistoryFindManySchema } from '../findManyPaymentStatusHistory.schema';
import { PaymentCountOutputTypeArgsObjectSchema as PaymentCountOutputTypeArgsObjectSchema } from './PaymentCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  orderId: z.boolean().optional(),
  status: z.boolean().optional(),
  amount: z.boolean().optional(),
  currency: z.boolean().optional(),
  stripePaymentIntentId: z.boolean().optional(),
  stripeChargeId: z.boolean().optional(),
  stripeCheckoutSessionId: z.boolean().optional(),
  stripeCustomerId: z.boolean().optional(),
  idempotencyKey: z.boolean().optional(),
  failureCode: z.boolean().optional(),
  failureMessage: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  succeededAt: z.boolean().optional(),
  canceledAt: z.boolean().optional(),
  order: z.union([z.boolean(), z.lazy(() => OrderArgsObjectSchema)]).optional(),
  statusHistory: z.union([z.boolean(), z.lazy(() => PaymentStatusHistoryFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => PaymentCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const PaymentSelectObjectSchema: z.ZodType<Prisma.PaymentSelect> = makeSchema() as unknown as z.ZodType<Prisma.PaymentSelect>;
export const PaymentSelectObjectZodSchema = makeSchema();
