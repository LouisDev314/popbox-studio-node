import * as z from 'zod';

export const PaymentScalarFieldEnumSchema = z.enum(['id', 'orderId', 'status', 'amount', 'currency', 'stripePaymentIntentId', 'stripeChargeId', 'stripeCheckoutSessionId', 'stripeCustomerId', 'idempotencyKey', 'failureCode', 'failureMessage', 'metadata', 'createdAt', 'updatedAt', 'succeededAt', 'canceledAt'])

export type PaymentScalarFieldEnum = z.infer<typeof PaymentScalarFieldEnumSchema>;