import * as z from 'zod';
export const WebhookEventFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  stripeEventId: z.string(),
  type: z.string(),
  payload: z.unknown(),
  processed: z.boolean(),
  processedAt: z.date().optional(),
  processingStartedAt: z.date().optional(),
  errorMessage: z.string().optional(),
  retryCount: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date().optional()
}));