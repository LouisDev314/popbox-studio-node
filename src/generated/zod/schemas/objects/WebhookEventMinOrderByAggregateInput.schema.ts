import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  stripeEventId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  processed: SortOrderSchema.optional(),
  processedAt: SortOrderSchema.optional(),
  processingStartedAt: SortOrderSchema.optional(),
  errorMessage: SortOrderSchema.optional(),
  retryCount: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const WebhookEventMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WebhookEventMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.WebhookEventMinOrderByAggregateInput>;
export const WebhookEventMinOrderByAggregateInputObjectZodSchema = makeSchema();
