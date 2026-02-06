import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  shipmentId: SortOrderSchema.optional(),
  orderItemId: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional()
}).strict();
export const ShipmentItemMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ShipmentItemMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemMinOrderByAggregateInput>;
export const ShipmentItemMinOrderByAggregateInputObjectZodSchema = makeSchema();
