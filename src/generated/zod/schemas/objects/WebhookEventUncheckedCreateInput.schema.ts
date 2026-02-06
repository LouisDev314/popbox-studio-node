import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  stripeEventId: z.string().max(255),
  type: z.string().max(100),
  payload: z.union([JsonNullValueInputSchema, jsonSchema]),
  processed: z.boolean().optional(),
  processedAt: z.coerce.date().optional().nullable(),
  processingStartedAt: z.coerce.date().optional().nullable(),
  errorMessage: z.string().optional().nullable(),
  retryCount: z.number().int().optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const WebhookEventUncheckedCreateInputObjectSchema: z.ZodType<Prisma.WebhookEventUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.WebhookEventUncheckedCreateInput>;
export const WebhookEventUncheckedCreateInputObjectZodSchema = makeSchema();
