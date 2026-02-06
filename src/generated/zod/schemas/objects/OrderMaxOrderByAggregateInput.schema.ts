import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  orderNumber: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  subtotalAmount: SortOrderSchema.optional(),
  taxAmount: SortOrderSchema.optional(),
  shippingAmount: SortOrderSchema.optional(),
  discountAmount: SortOrderSchema.optional(),
  totalAmount: SortOrderSchema.optional(),
  currency: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const OrderMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OrderMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderMaxOrderByAggregateInput>;
export const OrderMaxOrderByAggregateInputObjectZodSchema = makeSchema();
