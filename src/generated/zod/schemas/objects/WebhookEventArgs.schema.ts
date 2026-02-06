import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WebhookEventSelectObjectSchema as WebhookEventSelectObjectSchema } from './WebhookEventSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => WebhookEventSelectObjectSchema).optional()
}).strict();
export const WebhookEventArgsObjectSchema = makeSchema();
export const WebhookEventArgsObjectZodSchema = makeSchema();
