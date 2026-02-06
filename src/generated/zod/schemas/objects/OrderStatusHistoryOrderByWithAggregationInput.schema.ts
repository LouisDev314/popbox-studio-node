import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { OrderStatusHistoryCountOrderByAggregateInputObjectSchema as OrderStatusHistoryCountOrderByAggregateInputObjectSchema } from './OrderStatusHistoryCountOrderByAggregateInput.schema';
import { OrderStatusHistoryMaxOrderByAggregateInputObjectSchema as OrderStatusHistoryMaxOrderByAggregateInputObjectSchema } from './OrderStatusHistoryMaxOrderByAggregateInput.schema';
import { OrderStatusHistoryMinOrderByAggregateInputObjectSchema as OrderStatusHistoryMinOrderByAggregateInputObjectSchema } from './OrderStatusHistoryMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  orderId: SortOrderSchema.optional(),
  fromStatus: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  toStatus: SortOrderSchema.optional(),
  reason: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  changedBy: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => OrderStatusHistoryCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => OrderStatusHistoryMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => OrderStatusHistoryMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const OrderStatusHistoryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryOrderByWithAggregationInput>;
export const OrderStatusHistoryOrderByWithAggregationInputObjectZodSchema = makeSchema();
