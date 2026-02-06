import * as z from 'zod';
export const WebhookEventGroupByResultSchema = z.array(z.object({
  id: z.string(),
  stripeEventId: z.string(),
  type: z.string(),
  payload: z.unknown(),
  processed: z.boolean(),
  processedAt: z.date(),
  processingStartedAt: z.date(),
  errorMessage: z.string(),
  retryCount: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    stripeEventId: z.number(),
    type: z.number(),
    payload: z.number(),
    processed: z.number(),
    processedAt: z.number(),
    processingStartedAt: z.number(),
    errorMessage: z.number(),
    retryCount: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    retryCount: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    retryCount: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    stripeEventId: z.string().nullable(),
    type: z.string().nullable(),
    processedAt: z.date().nullable(),
    processingStartedAt: z.date().nullable(),
    errorMessage: z.string().nullable(),
    retryCount: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    stripeEventId: z.string().nullable(),
    type: z.string().nullable(),
    processedAt: z.date().nullable(),
    processingStartedAt: z.date().nullable(),
    errorMessage: z.string().nullable(),
    retryCount: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));