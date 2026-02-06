import * as z from 'zod';
import { PaymentStatusSchema } from '../../enums/PaymentStatus.schema';
// prettier-ignore
export const PaymentInputSchema = z.object({
    id: z.string(),
    orderId: z.string(),
    status: PaymentStatusSchema,
    amount: z.bigint(),
    currency: z.string(),
    stripePaymentIntentId: z.string(),
    stripeChargeId: z.string().optional().nullable(),
    stripeCheckoutSessionId: z.string().optional().nullable(),
    stripeCustomerId: z.string().optional().nullable(),
    idempotencyKey: z.string().optional().nullable(),
    failureCode: z.string().optional().nullable(),
    failureMessage: z.string().optional().nullable(),
    metadata: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date().optional().nullable(),
    succeededAt: z.date().optional().nullable(),
    canceledAt: z.date().optional().nullable(),
    order: z.unknown(),
    statusHistory: z.array(z.unknown())
}).strict();

export type PaymentInputType = z.infer<typeof PaymentInputSchema>;
