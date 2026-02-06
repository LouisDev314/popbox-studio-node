import * as z from 'zod';
// prettier-ignore
export const WebhookEventInputSchema = z.object({
    id: z.string(),
    stripeEventId: z.string(),
    type: z.string(),
    payload: z.unknown(),
    processed: z.boolean(),
    processedAt: z.date().optional().nullable(),
    processingStartedAt: z.date().optional().nullable(),
    errorMessage: z.string().optional().nullable(),
    retryCount: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date().optional().nullable()
}).strict();

export type WebhookEventInputType = z.infer<typeof WebhookEventInputSchema>;
