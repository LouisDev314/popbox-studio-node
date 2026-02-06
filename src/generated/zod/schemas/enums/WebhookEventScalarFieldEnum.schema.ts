import * as z from 'zod';

export const WebhookEventScalarFieldEnumSchema = z.enum(['id', 'stripeEventId', 'type', 'payload', 'processed', 'processedAt', 'processingStartedAt', 'errorMessage', 'retryCount', 'createdAt', 'updatedAt'])

export type WebhookEventScalarFieldEnum = z.infer<typeof WebhookEventScalarFieldEnumSchema>;