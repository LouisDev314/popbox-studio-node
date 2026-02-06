import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ShipmentItemCountOrderByAggregateInputObjectSchema as ShipmentItemCountOrderByAggregateInputObjectSchema } from './ShipmentItemCountOrderByAggregateInput.schema';
import { ShipmentItemAvgOrderByAggregateInputObjectSchema as ShipmentItemAvgOrderByAggregateInputObjectSchema } from './ShipmentItemAvgOrderByAggregateInput.schema';
import { ShipmentItemMaxOrderByAggregateInputObjectSchema as ShipmentItemMaxOrderByAggregateInputObjectSchema } from './ShipmentItemMaxOrderByAggregateInput.schema';
import { ShipmentItemMinOrderByAggregateInputObjectSchema as ShipmentItemMinOrderByAggregateInputObjectSchema } from './ShipmentItemMinOrderByAggregateInput.schema';
import { ShipmentItemSumOrderByAggregateInputObjectSchema as ShipmentItemSumOrderByAggregateInputObjectSchema } from './ShipmentItemSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  shipmentId: SortOrderSchema.optional(),
  orderItemId: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  _count: z.lazy(() => ShipmentItemCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ShipmentItemAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ShipmentItemMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ShipmentItemMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ShipmentItemSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ShipmentItemOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ShipmentItemOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemOrderByWithAggregationInput>;
export const ShipmentItemOrderByWithAggregationInputObjectZodSchema = makeSchema();
