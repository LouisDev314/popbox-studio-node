import * as z from 'zod';
export const PaymentFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  orderId: z.string(),
  status: z.unknown(),
  amount: z.bigint(),
  currency: z.string(),
  stripePaymentIntentId: z.string(),
  stripeChargeId: z.string().optional(),
  stripeCheckoutSessionId: z.string().optional(),
  stripeCustomerId: z.string().optional(),
  idempotencyKey: z.string().optional(),
  failureCode: z.string().optional(),
  failureMessage: z.string().optional(),
  metadata: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  succeededAt: z.date().optional(),
  canceledAt: z.date().optional(),
  order: z.unknown(),
  statusHistory: z.array(z.unknown())
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});