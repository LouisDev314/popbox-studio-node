import * as z from 'zod';

export const PaymentStatusHistoryOrderByRelevanceFieldEnumSchema = z.enum(['id', 'paymentId', 'reason', 'stripeEventId'])

export type PaymentStatusHistoryOrderByRelevanceFieldEnum = z.infer<typeof PaymentStatusHistoryOrderByRelevanceFieldEnumSchema>;