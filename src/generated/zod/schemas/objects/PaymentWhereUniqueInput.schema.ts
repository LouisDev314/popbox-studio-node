import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  stripePaymentIntentId: z.string().max(255).optional(),
  stripeChargeId: z.string().max(255).optional(),
  stripeCheckoutSessionId: z.string().max(255).optional(),
  idempotencyKey: z.string().max(255).optional()
}).strict();
export const PaymentWhereUniqueInputObjectSchema: z.ZodType<Prisma.PaymentWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentWhereUniqueInput>;
export const PaymentWhereUniqueInputObjectZodSchema = makeSchema();
