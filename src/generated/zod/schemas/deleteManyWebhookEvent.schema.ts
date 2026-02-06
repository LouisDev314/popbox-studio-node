import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebhookEventWhereInputObjectSchema as WebhookEventWhereInputObjectSchema } from './objects/WebhookEventWhereInput.schema';

export const WebhookEventDeleteManySchema: z.ZodType<Prisma.WebhookEventDeleteManyArgs> = z.object({ where: WebhookEventWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.WebhookEventDeleteManyArgs>;

export const WebhookEventDeleteManyZodSchema = z.object({ where: WebhookEventWhereInputObjectSchema.optional() }).strict();