import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebhookEventSelectObjectSchema as WebhookEventSelectObjectSchema } from './objects/WebhookEventSelect.schema';
import { WebhookEventWhereUniqueInputObjectSchema as WebhookEventWhereUniqueInputObjectSchema } from './objects/WebhookEventWhereUniqueInput.schema';

export const WebhookEventFindUniqueSchema: z.ZodType<Prisma.WebhookEventFindUniqueArgs> = z.object({ select: WebhookEventSelectObjectSchema.optional(),  where: WebhookEventWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.WebhookEventFindUniqueArgs>;

export const WebhookEventFindUniqueZodSchema = z.object({ select: WebhookEventSelectObjectSchema.optional(),  where: WebhookEventWhereUniqueInputObjectSchema }).strict();