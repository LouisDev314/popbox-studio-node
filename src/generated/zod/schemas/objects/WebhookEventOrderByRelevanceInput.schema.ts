import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WebhookEventOrderByRelevanceFieldEnumSchema } from '../enums/WebhookEventOrderByRelevanceFieldEnum.schema';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  fields: z.union([WebhookEventOrderByRelevanceFieldEnumSchema, WebhookEventOrderByRelevanceFieldEnumSchema.array()]),
  sort: SortOrderSchema,
  search: z.string()
}).strict();
export const WebhookEventOrderByRelevanceInputObjectSchema: z.ZodType<Prisma.WebhookEventOrderByRelevanceInput> = makeSchema() as unknown as z.ZodType<Prisma.WebhookEventOrderByRelevanceInput>;
export const WebhookEventOrderByRelevanceInputObjectZodSchema = makeSchema();
