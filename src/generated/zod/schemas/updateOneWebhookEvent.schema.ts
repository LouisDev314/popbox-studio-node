import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebhookEventSelectObjectSchema as WebhookEventSelectObjectSchema } from './objects/WebhookEventSelect.schema';
import { WebhookEventUpdateInputObjectSchema as WebhookEventUpdateInputObjectSchema } from './objects/WebhookEventUpdateInput.schema';
import { WebhookEventUncheckedUpdateInputObjectSchema as WebhookEventUncheckedUpdateInputObjectSchema } from './objects/WebhookEventUncheckedUpdateInput.schema';
import { WebhookEventWhereUniqueInputObjectSchema as WebhookEventWhereUniqueInputObjectSchema } from './objects/WebhookEventWhereUniqueInput.schema';

export const WebhookEventUpdateOneSchema: z.ZodType<Prisma.WebhookEventUpdateArgs> = z.object({ select: WebhookEventSelectObjectSchema.optional(),  data: z.union([WebhookEventUpdateInputObjectSchema, WebhookEventUncheckedUpdateInputObjectSchema]), where: WebhookEventWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.WebhookEventUpdateArgs>;

export const WebhookEventUpdateOneZodSchema = z.object({ select: WebhookEventSelectObjectSchema.optional(),  data: z.union([WebhookEventUpdateInputObjectSchema, WebhookEventUncheckedUpdateInputObjectSchema]), where: WebhookEventWhereUniqueInputObjectSchema }).strict();