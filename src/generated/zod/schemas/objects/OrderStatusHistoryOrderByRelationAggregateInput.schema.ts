import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const OrderStatusHistoryOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryOrderByRelationAggregateInput>;
export const OrderStatusHistoryOrderByRelationAggregateInputObjectZodSchema = makeSchema();
