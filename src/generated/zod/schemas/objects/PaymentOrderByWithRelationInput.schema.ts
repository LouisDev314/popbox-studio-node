import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { OrderOrderByWithRelationInputObjectSchema as OrderOrderByWithRelationInputObjectSchema } from './OrderOrderByWithRelationInput.schema';
import { PaymentStatusHistoryOrderByRelationAggregateInputObjectSchema as PaymentStatusHistoryOrderByRelationAggregateInputObjectSchema } from './PaymentStatusHistoryOrderByRelationAggregateInput.schema';
import { PaymentOrderByRelevanceInputObjectSchema as PaymentOrderByRelevanceInputObjectSchema } from './PaymentOrderByRelevanceInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  orderId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  currency: SortOrderSchema.optional(),
  stripePaymentIntentId: SortOrderSchema.optional(),
  stripeChargeId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  stripeCheckoutSessionId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  stripeCustomerId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  idempotencyKey: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  failureCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  failureMessage: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  succeededAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  canceledAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  order: z.lazy(() => OrderOrderByWithRelationInputObjectSchema).optional(),
  statusHistory: z.lazy(() => PaymentStatusHistoryOrderByRelationAggregateInputObjectSchema).optional(),
  _relevance: z.lazy(() => PaymentOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const PaymentOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PaymentOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentOrderByWithRelationInput>;
export const PaymentOrderByWithRelationInputObjectZodSchema = makeSchema();
