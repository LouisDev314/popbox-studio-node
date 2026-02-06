import * as z from 'zod';

export const WebhookEventSchema = z.object({
  id: z.string(),
  stripeEventId: z.string(),
  type: z.string(),
  payload: z.unknown().refine((val) => { const getDepth = (obj: unknown, depth: number = 0): number => { if (depth > 10) return depth; if (obj === null || typeof obj !== 'object') return depth; const values = Object.values(obj as Record<string, unknown>); if (values.length === 0) return depth; return Math.max(...values.map(v => getDepth(v, depth + 1))); }; return getDepth(val) <= 10; }, "JSON nesting depth exceeds maximum of 10"),
  processed: z.boolean(),
  processedAt: z.date().nullish(),
  processingStartedAt: z.date().nullish(),
  errorMessage: z.string().nullish(),
  retryCount: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
});

export type WebhookEventType = z.infer<typeof WebhookEventSchema>;
