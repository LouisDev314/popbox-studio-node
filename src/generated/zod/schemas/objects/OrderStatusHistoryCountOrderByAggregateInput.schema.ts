import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  orderId: SortOrderSchema.optional(),
  fromStatus: SortOrderSchema.optional(),
  toStatus: SortOrderSchema.optional(),
  reason: SortOrderSchema.optional(),
  changedBy: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const OrderStatusHistoryCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryCountOrderByAggregateInput>;
export const OrderStatusHistoryCountOrderByAggregateInputObjectZodSchema = makeSchema();
