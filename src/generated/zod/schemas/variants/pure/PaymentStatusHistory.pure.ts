import * as z from 'zod';
import { PaymentStatusSchema } from '../../enums/PaymentStatus.schema';
// prettier-ignore
export const PaymentStatusHistoryModelSchema = z.object({
    id: z.string(),
    paymentId: z.string(),
    fromStatus: PaymentStatusSchema.nullable(),
    toStatus: PaymentStatusSchema,
    reason: z.string().nullable(),
    stripeEventId: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    payment: z.unknown()
}).strict();

export type PaymentStatusHistoryPureType = z.infer<typeof PaymentStatusHistoryModelSchema>;
