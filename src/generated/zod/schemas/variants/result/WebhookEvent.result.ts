import * as z from 'zod';
// prettier-ignore
export const WebhookEventResultSchema = z.object({
    id: z.string(),
    stripeEventId: z.string(),
    type: z.string(),
    payload: z.unknown(),
    processed: z.boolean(),
    processedAt: z.date().nullable(),
    processingStartedAt: z.date().nullable(),
    errorMessage: z.string().nullable(),
    retryCount: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date().nullable()
}).strict();

export type WebhookEventResultType = z.infer<typeof WebhookEventResultSchema>;
