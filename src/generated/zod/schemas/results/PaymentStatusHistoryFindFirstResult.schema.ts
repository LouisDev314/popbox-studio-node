import * as z from 'zod';
export const PaymentStatusHistoryFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  paymentId: z.string(),
  fromStatus: z.unknown().optional(),
  toStatus: z.unknown(),
  reason: z.string().optional(),
  stripeEventId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  payment: z.unknown()
}));