import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WebhookEventOrderByWithRelationInputObjectSchema as WebhookEventOrderByWithRelationInputObjectSchema } from './objects/WebhookEventOrderByWithRelationInput.schema';
import { WebhookEventWhereInputObjectSchema as WebhookEventWhereInputObjectSchema } from './objects/WebhookEventWhereInput.schema';
import { WebhookEventWhereUniqueInputObjectSchema as WebhookEventWhereUniqueInputObjectSchema } from './objects/WebhookEventWhereUniqueInput.schema';
import { WebhookEventScalarFieldEnumSchema } from './enums/WebhookEventScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const WebhookEventFindFirstSelectSchema: z.ZodType<Prisma.WebhookEventSelect> = z.object({
    id: z.boolean().optional(),
    stripeEventId: z.boolean().optional(),
    type: z.boolean().optional(),
    payload: z.boolean().optional(),
    processed: z.boolean().optional(),
    processedAt: z.boolean().optional(),
    processingStartedAt: z.boolean().optional(),
    errorMessage: z.boolean().optional(),
    retryCount: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.WebhookEventSelect>;

export const WebhookEventFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    stripeEventId: z.boolean().optional(),
    type: z.boolean().optional(),
    payload: z.boolean().optional(),
    processed: z.boolean().optional(),
    processedAt: z.boolean().optional(),
    processingStartedAt: z.boolean().optional(),
    errorMessage: z.boolean().optional(),
    retryCount: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const WebhookEventFindFirstSchema: z.ZodType<Prisma.WebhookEventFindFirstArgs> = z.object({ select: WebhookEventFindFirstSelectSchema.optional(),  orderBy: z.union([WebhookEventOrderByWithRelationInputObjectSchema, WebhookEventOrderByWithRelationInputObjectSchema.array()]).optional(), where: WebhookEventWhereInputObjectSchema.optional(), cursor: WebhookEventWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([WebhookEventScalarFieldEnumSchema, WebhookEventScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.WebhookEventFindFirstArgs>;

export const WebhookEventFindFirstZodSchema = z.object({ select: WebhookEventFindFirstSelectSchema.optional(),  orderBy: z.union([WebhookEventOrderByWithRelationInputObjectSchema, WebhookEventOrderByWithRelationInputObjectSchema.array()]).optional(), where: WebhookEventWhereInputObjectSchema.optional(), cursor: WebhookEventWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([WebhookEventScalarFieldEnumSchema, WebhookEventScalarFieldEnumSchema.array()]).optional() }).strict();