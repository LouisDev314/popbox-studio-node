import * as z from 'zod';
import { PaymentStatusSchema } from '../../enums/PaymentStatus.schema';
// prettier-ignore
export const PaymentStatusHistoryInputSchema = z.object({
    id: z.string(),
    paymentId: z.string(),
    fromStatus: PaymentStatusSchema.optional().nullable(),
    toStatus: PaymentStatusSchema,
    reason: z.string().optional().nullable(),
    stripeEventId: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date().optional().nullable(),
    payment: z.unknown()
}).strict();

export type PaymentStatusHistoryInputType = z.infer<typeof PaymentStatusHistoryInputSchema>;
