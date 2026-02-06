import * as z from 'zod';

export const PaymentOrderByRelevanceFieldEnumSchema = z.enum(['id', 'orderId', 'currency', 'stripePaymentIntentId', 'stripeChargeId', 'stripeCheckoutSessionId', 'stripeCustomerId', 'idempotencyKey', 'failureCode', 'failureMessage'])

export type PaymentOrderByRelevanceFieldEnum = z.infer<typeof PaymentOrderByRelevanceFieldEnumSchema>;