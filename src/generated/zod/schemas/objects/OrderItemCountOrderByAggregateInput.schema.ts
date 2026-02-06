import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  orderId: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  variantId: SortOrderSchema.optional(),
  productName: SortOrderSchema.optional(),
  variantName: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  unitPrice: SortOrderSchema.optional(),
  currency: SortOrderSchema.optional()
}).strict();
export const OrderItemCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OrderItemCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemCountOrderByAggregateInput>;
export const OrderItemCountOrderByAggregateInputObjectZodSchema = makeSchema();
