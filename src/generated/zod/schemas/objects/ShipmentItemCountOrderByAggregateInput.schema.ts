import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  shipmentId: SortOrderSchema.optional(),
  orderItemId: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional()
}).strict();
export const ShipmentItemCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ShipmentItemCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemCountOrderByAggregateInput>;
export const ShipmentItemCountOrderByAggregateInputObjectZodSchema = makeSchema();
