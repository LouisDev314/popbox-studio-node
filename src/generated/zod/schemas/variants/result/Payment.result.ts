import * as z from 'zod';
import { PaymentStatusSchema } from '../../enums/PaymentStatus.schema';
// prettier-ignore
export const PaymentResultSchema = z.object({
    id: z.string(),
    orderId: z.string(),
    status: PaymentStatusSchema,
    amount: z.bigint(),
    currency: z.string(),
    stripePaymentIntentId: z.string(),
    stripeChargeId: z.string().nullable(),
    stripeCheckoutSessionId: z.string().nullable(),
    stripeCustomerId: z.string().nullable(),
    idempotencyKey: z.string().nullable(),
    failureCode: z.string().nullable(),
    failureMessage: z.string().nullable(),
    metadata: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    succeededAt: z.date().nullable(),
    canceledAt: z.date().nullable(),
    order: z.unknown(),
    statusHistory: z.array(z.unknown())
}).strict();

export type PaymentResultType = z.infer<typeof PaymentResultSchema>;
