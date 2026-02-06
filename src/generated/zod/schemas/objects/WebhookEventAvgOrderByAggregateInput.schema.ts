import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  retryCount: SortOrderSchema.optional()
}).strict();
export const WebhookEventAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WebhookEventAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.WebhookEventAvgOrderByAggregateInput>;
export const WebhookEventAvgOrderByAggregateInputObjectZodSchema = makeSchema();
