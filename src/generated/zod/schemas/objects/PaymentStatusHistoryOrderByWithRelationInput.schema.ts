import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PaymentOrderByWithRelationInputObjectSchema as PaymentOrderByWithRelationInputObjectSchema } from './PaymentOrderByWithRelationInput.schema';
import { PaymentStatusHistoryOrderByRelevanceInputObjectSchema as PaymentStatusHistoryOrderByRelevanceInputObjectSchema } from './PaymentStatusHistoryOrderByRelevanceInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  paymentId: SortOrderSchema.optional(),
  fromStatus: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  toStatus: SortOrderSchema.optional(),
  reason: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  stripeEventId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  payment: z.lazy(() => PaymentOrderByWithRelationInputObjectSchema).optional(),
  _relevance: z.lazy(() => PaymentStatusHistoryOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const PaymentStatusHistoryOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryOrderByWithRelationInput>;
export const PaymentStatusHistoryOrderByWithRelationInputObjectZodSchema = makeSchema();
