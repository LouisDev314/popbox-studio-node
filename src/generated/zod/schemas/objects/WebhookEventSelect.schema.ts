import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  stripeEventId: z.boolean().optional(),
  type: z.boolean().optional(),
  payload: z.boolean().optional(),
  processed: z.boolean().optional(),
  processedAt: z.boolean().optional(),
  processingStartedAt: z.boolean().optional(),
  errorMessage: z.boolean().optional(),
  retryCount: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const WebhookEventSelectObjectSchema: z.ZodType<Prisma.WebhookEventSelect> = makeSchema() as unknown as z.ZodType<Prisma.WebhookEventSelect>;
export const WebhookEventSelectObjectZodSchema = makeSchema();
