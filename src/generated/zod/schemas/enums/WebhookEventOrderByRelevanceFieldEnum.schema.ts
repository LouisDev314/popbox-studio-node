import * as z from 'zod';

export const WebhookEventOrderByRelevanceFieldEnumSchema = z.enum(['id', 'stripeEventId', 'type', 'errorMessage'])

export type WebhookEventOrderByRelevanceFieldEnum = z.infer<typeof WebhookEventOrderByRelevanceFieldEnumSchema>;