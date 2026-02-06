import * as z from 'zod';
export const WebhookEventFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});