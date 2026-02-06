import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  orderId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  currency: SortOrderSchema.optional(),
  stripePaymentIntentId: SortOrderSchema.optional(),
  stripeChargeId: SortOrderSchema.optional(),
  stripeCheckoutSessionId: SortOrderSchema.optional(),
  stripeCustomerId: SortOrderSchema.optional(),
  idempotencyKey: SortOrderSchema.optional(),
  failureCode: SortOrderSchema.optional(),
  failureMessage: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  succeededAt: SortOrderSchema.optional(),
  canceledAt: SortOrderSchema.optional()
}).strict();
export const PaymentMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PaymentMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentMaxOrderByAggregateInput>;
export const PaymentMaxOrderByAggregateInputObjectZodSchema = makeSchema();
