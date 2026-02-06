import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  paymentId: SortOrderSchema.optional(),
  fromStatus: SortOrderSchema.optional(),
  toStatus: SortOrderSchema.optional(),
  reason: SortOrderSchema.optional(),
  stripeEventId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const PaymentStatusHistoryCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryCountOrderByAggregateInput>;
export const PaymentStatusHistoryCountOrderByAggregateInputObjectZodSchema = makeSchema();
