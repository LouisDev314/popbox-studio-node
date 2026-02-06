import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  orderId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  line1: SortOrderSchema.optional(),
  line2: SortOrderSchema.optional(),
  city: SortOrderSchema.optional(),
  state: SortOrderSchema.optional(),
  postalCode: SortOrderSchema.optional(),
  country: SortOrderSchema.optional(),
  phone: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const OrderAddressMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OrderAddressMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressMinOrderByAggregateInput>;
export const OrderAddressMinOrderByAggregateInputObjectZodSchema = makeSchema();
