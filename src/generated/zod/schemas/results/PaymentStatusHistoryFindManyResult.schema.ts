import * as z from 'zod';
export const PaymentStatusHistoryFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  paymentId: z.string(),
  fromStatus: z.unknown().optional(),
  toStatus: z.unknown(),
  reason: z.string().optional(),
  stripeEventId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  payment: z.unknown()
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