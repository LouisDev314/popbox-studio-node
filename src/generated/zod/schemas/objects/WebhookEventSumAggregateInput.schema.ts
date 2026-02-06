import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  retryCount: z.literal(true).optional()
}).strict();
export const WebhookEventSumAggregateInputObjectSchema: z.ZodType<Prisma.WebhookEventSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.WebhookEventSumAggregateInputType>;
export const WebhookEventSumAggregateInputObjectZodSchema = makeSchema();
