import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  stripeEventId: z.literal(true).optional(),
  type: z.literal(true).optional(),
  payload: z.literal(true).optional(),
  processed: z.literal(true).optional(),
  processedAt: z.literal(true).optional(),
  processingStartedAt: z.literal(true).optional(),
  errorMessage: z.literal(true).optional(),
  retryCount: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const WebhookEventCountAggregateInputObjectSchema: z.ZodType<Prisma.WebhookEventCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.WebhookEventCountAggregateInputType>;
export const WebhookEventCountAggregateInputObjectZodSchema = makeSchema();
