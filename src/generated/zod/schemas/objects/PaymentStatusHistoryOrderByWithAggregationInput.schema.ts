import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PaymentStatusHistoryCountOrderByAggregateInputObjectSchema as PaymentStatusHistoryCountOrderByAggregateInputObjectSchema } from './PaymentStatusHistoryCountOrderByAggregateInput.schema';
import { PaymentStatusHistoryMaxOrderByAggregateInputObjectSchema as PaymentStatusHistoryMaxOrderByAggregateInputObjectSchema } from './PaymentStatusHistoryMaxOrderByAggregateInput.schema';
import { PaymentStatusHistoryMinOrderByAggregateInputObjectSchema as PaymentStatusHistoryMinOrderByAggregateInputObjectSchema } from './PaymentStatusHistoryMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  paymentId: SortOrderSchema.optional(),
  fromStatus: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  toStatus: SortOrderSchema.optional(),
  reason: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  stripeEventId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => PaymentStatusHistoryCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PaymentStatusHistoryMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PaymentStatusHistoryMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PaymentStatusHistoryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryOrderByWithAggregationInput>;
export const PaymentStatusHistoryOrderByWithAggregationInputObjectZodSchema = makeSchema();
