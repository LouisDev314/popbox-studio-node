import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  retryCount: SortOrderSchema.optional()
}).strict();
export const WebhookEventSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WebhookEventSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.WebhookEventSumOrderByAggregateInput>;
export const WebhookEventSumOrderByAggregateInputObjectZodSchema = makeSchema();
