import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  stripeEventId: z.string().max(255).optional()
}).strict();
export const WebhookEventWhereUniqueInputObjectSchema: z.ZodType<Prisma.WebhookEventWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.WebhookEventWhereUniqueInput>;
export const WebhookEventWhereUniqueInputObjectZodSchema = makeSchema();
