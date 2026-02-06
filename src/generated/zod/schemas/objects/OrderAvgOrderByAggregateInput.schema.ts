import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  subtotalAmount: SortOrderSchema.optional(),
  taxAmount: SortOrderSchema.optional(),
  shippingAmount: SortOrderSchema.optional(),
  discountAmount: SortOrderSchema.optional(),
  totalAmount: SortOrderSchema.optional()
}).strict();
export const OrderAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OrderAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderAvgOrderByAggregateInput>;
export const OrderAvgOrderByAggregateInputObjectZodSchema = makeSchema();
