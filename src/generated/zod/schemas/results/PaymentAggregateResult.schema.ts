import * as z from 'zod';
export const PaymentAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    orderId: z.number(),
    status: z.number(),
    amount: z.number(),
    currency: z.number(),
    stripePaymentIntentId: z.number(),
    stripeChargeId: z.number(),
    stripeCheckoutSessionId: z.number(),
    stripeCustomerId: z.number(),
    idempotencyKey: z.number(),
    failureCode: z.number(),
    failureMessage: z.number(),
    metadata: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    succeededAt: z.number(),
    canceledAt: z.number(),
    order: z.number(),
    statusHistory: z.number()
  }).optional(),
  _sum: z.object({
    amount: z.bigint().nullable()
  }).nullable().optional(),
  _avg: z.object({
    amount: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    orderId: z.string().nullable(),
    amount: z.bigint().nullable(),
    currency: z.string().nullable(),
    stripePaymentIntentId: z.string().nullable(),
    stripeChargeId: z.string().nullable(),
    stripeCheckoutSessionId: z.string().nullable(),
    stripeCustomerId: z.string().nullable(),
    idempotencyKey: z.string().nullable(),
    failureCode: z.string().nullable(),
    failureMessage: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    succeededAt: z.date().nullable(),
    canceledAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    orderId: z.string().nullable(),
    amount: z.bigint().nullable(),
    currency: z.string().nullable(),
    stripePaymentIntentId: z.string().nullable(),
    stripeChargeId: z.string().nullable(),
    stripeCheckoutSessionId: z.string().nullable(),
    stripeCustomerId: z.string().nullable(),
    idempotencyKey: z.string().nullable(),
    failureCode: z.string().nullable(),
    failureMessage: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    succeededAt: z.date().nullable(),
    canceledAt: z.date().nullable()
  }).nullable().optional()});