import * as z from 'zod';

export const PaymentStatusHistoryScalarFieldEnumSchema = z.enum(['id', 'paymentId', 'fromStatus', 'toStatus', 'reason', 'stripeEventId', 'createdAt', 'updatedAt'])

export type PaymentStatusHistoryScalarFieldEnum = z.infer<typeof PaymentStatusHistoryScalarFieldEnumSchema>;