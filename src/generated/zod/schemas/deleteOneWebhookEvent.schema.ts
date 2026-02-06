import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebhookEventSelectObjectSchema as WebhookEventSelectObjectSchema } from './objects/WebhookEventSelect.schema';
import { WebhookEventWhereUniqueInputObjectSchema as WebhookEventWhereUniqueInputObjectSchema } from './objects/WebhookEventWhereUniqueInput.schema';

export const WebhookEventDeleteOneSchema: z.ZodType<Prisma.WebhookEventDeleteArgs> = z.object({ select: WebhookEventSelectObjectSchema.optional(),  where: WebhookEventWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.WebhookEventDeleteArgs>;

export const WebhookEventDeleteOneZodSchema = z.object({ select: WebhookEventSelectObjectSchema.optional(),  where: WebhookEventWhereUniqueInputObjectSchema }).strict();