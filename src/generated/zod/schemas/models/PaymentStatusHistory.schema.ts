import * as z from 'zod';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema';

export const PaymentStatusHistorySchema = z.object({
  id: z.string(),
  paymentId: z.string(),
  fromStatus: PaymentStatusSchema.nullish(),
  toStatus: PaymentStatusSchema,
  reason: z.string().nullish(),
  stripeEventId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
});

export type PaymentStatusHistoryType = z.infer<typeof PaymentStatusHistorySchema>;
