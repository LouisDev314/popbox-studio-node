import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { WebhookEventOrderByRelevanceInputObjectSchema as WebhookEventOrderByRelevanceInputObjectSchema } from './WebhookEventOrderByRelevanceInput.schema'

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
  _relevance: z.lazy(() => WebhookEventOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const WebhookEventOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.WebhookEventOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.WebhookEventOrderByWithRelationInput>;
export const WebhookEventOrderByWithRelationInputObjectZodSchema = makeSchema();
