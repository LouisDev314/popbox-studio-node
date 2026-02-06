import * as z from 'zod';
export const PaymentStatusHistoryAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    paymentId: z.number(),
    fromStatus: z.number(),
    toStatus: z.number(),
    reason: z.number(),
    stripeEventId: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    payment: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    paymentId: z.string().nullable(),
    reason: z.string().nullable(),
    stripeEventId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    paymentId: z.string().nullable(),
    reason: z.string().nullable(),
    stripeEventId: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});