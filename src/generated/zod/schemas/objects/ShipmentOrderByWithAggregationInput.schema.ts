import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ShipmentCountOrderByAggregateInputObjectSchema as ShipmentCountOrderByAggregateInputObjectSchema } from './ShipmentCountOrderByAggregateInput.schema';
import { ShipmentMaxOrderByAggregateInputObjectSchema as ShipmentMaxOrderByAggregateInputObjectSchema } from './ShipmentMaxOrderByAggregateInput.schema';
import { ShipmentMinOrderByAggregateInputObjectSchema as ShipmentMinOrderByAggregateInputObjectSchema } from './ShipmentMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  orderId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  carrier: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  serviceLevel: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  trackingNumber: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  trackingUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  shippedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  deliveredAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  canceledAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => ShipmentCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ShipmentMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ShipmentMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ShipmentOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ShipmentOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentOrderByWithAggregationInput>;
export const ShipmentOrderByWithAggregationInputObjectZodSchema = makeSchema();
