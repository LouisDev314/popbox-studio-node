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
export const WebhookEventMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WebhookEventMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.WebhookEventMaxOrderByAggregateInput>;
export const WebhookEventMaxOrderByAggregateInputObjectZodSchema = makeSchema();
