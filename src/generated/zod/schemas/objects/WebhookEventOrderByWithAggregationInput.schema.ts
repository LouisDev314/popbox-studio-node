import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { WebhookEventCountOrderByAggregateInputObjectSchema as WebhookEventCountOrderByAggregateInputObjectSchema } from './WebhookEventCountOrderByAggregateInput.schema';
import { WebhookEventAvgOrderByAggregateInputObjectSchema as WebhookEventAvgOrderByAggregateInputObjectSchema } from './WebhookEventAvgOrderByAggregateInput.schema';
import { WebhookEventMaxOrderByAggregateInputObjectSchema as WebhookEventMaxOrderByAggregateInputObjectSchema } from './WebhookEventMaxOrderByAggregateInput.schema';
import { WebhookEventMinOrderByAggregateInputObjectSchema as WebhookEventMinOrderByAggregateInputObjectSchema } from './WebhookEventMinOrderByAggregateInput.schema';
import { WebhookEventSumOrderByAggregateInputObjectSchema as WebhookEventSumOrderByAggregateInputObjectSchema } from './WebhookEventSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  stripeEventId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  payload: SortOrderSchema.optional(),
  processed: SortOrderSchema.optional(),
  processedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  processingStartedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  errorMessage: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  retryCount: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => WebhookEventCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => WebhookEventAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => WebhookEventMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => WebhookEventMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => WebhookEventSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const WebhookEventOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.WebhookEventOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.WebhookEventOrderByWithAggregationInput>;
export const WebhookEventOrderByWithAggregationInputObjectZodSchema = makeSchema();
