import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const webhookeventwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => WebhookEventWhereInputObjectSchema), z.lazy(() => WebhookEventWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => WebhookEventWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => WebhookEventWhereInputObjectSchema), z.lazy(() => WebhookEventWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  stripeEventId: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(255)]).optional(),
  type: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(100)]).optional(),
  payload: z.lazy(() => JsonFilterObjectSchema).optional(),
  processed: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  processedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  processingStartedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  errorMessage: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  retryCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const WebhookEventWhereInputObjectSchema: z.ZodType<Prisma.WebhookEventWhereInput> = webhookeventwhereinputSchema as unknown as z.ZodType<Prisma.WebhookEventWhereInput>;
export const WebhookEventWhereInputObjectZodSchema = webhookeventwhereinputSchema;
