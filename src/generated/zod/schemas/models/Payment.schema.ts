import * as z from 'zod';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema';

export const PaymentSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  status: PaymentStatusSchema.default("PROCESSING"),
  amount: z.bigint(),
  currency: z.string().default("CAD"),
  stripePaymentIntentId: z.string(),
  stripeChargeId: z.string().nullish(),
  stripeCheckoutSessionId: z.string().nullish(),
  stripeCustomerId: z.string().nullish(),
  idempotencyKey: z.string().nullish(),
  failureCode: z.string().nullish(),
  failureMessage: z.string().nullish(),
  metadata: z.unknown().refine((val) => { const getDepth = (obj: unknown, depth: number = 0): number => { if (depth > 10) return depth; if (obj === null || typeof obj !== 'object') return depth; const values = Object.values(obj as Record<string, unknown>); if (values.length === 0) return depth; return Math.max(...values.map(v => getDepth(v, depth + 1))); }; return getDepth(val) <= 10; }, "JSON nesting depth exceeds maximum of 10").nullish(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  succeededAt: z.date().nullish(),
  canceledAt: z.date().nullish(),
});

export type PaymentType = z.infer<typeof PaymentSchema>;
