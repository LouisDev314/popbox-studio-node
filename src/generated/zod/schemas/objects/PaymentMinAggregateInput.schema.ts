import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  orderId: z.literal(true).optional(),
  status: z.literal(true).optional(),
  amount: z.literal(true).optional(),
  currency: z.literal(true).optional(),
  stripePaymentIntentId: z.literal(true).optional(),
  stripeChargeId: z.literal(true).optional(),
  stripeCheckoutSessionId: z.literal(true).optional(),
  stripeCustomerId: z.literal(true).optional(),
  idempotencyKey: z.literal(true).optional(),
  failureCode: z.literal(true).optional(),
  failureMessage: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  succeededAt: z.literal(true).optional(),
  canceledAt: z.literal(true).optional()
}).strict();
export const PaymentMinAggregateInputObjectSchema: z.ZodType<Prisma.PaymentMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PaymentMinAggregateInputType>;
export const PaymentMinAggregateInputObjectZodSchema = makeSchema();
