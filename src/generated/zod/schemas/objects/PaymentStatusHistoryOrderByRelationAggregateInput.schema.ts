import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const PaymentStatusHistoryOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryOrderByRelationAggregateInput>;
export const PaymentStatusHistoryOrderByRelationAggregateInputObjectZodSchema = makeSchema();
