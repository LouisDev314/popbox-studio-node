import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { OrderOrderByWithRelationInputObjectSchema as OrderOrderByWithRelationInputObjectSchema } from './OrderOrderByWithRelationInput.schema';
import { ShipmentItemOrderByRelationAggregateInputObjectSchema as ShipmentItemOrderByRelationAggregateInputObjectSchema } from './ShipmentItemOrderByRelationAggregateInput.schema';
import { ShipmentOrderByRelevanceInputObjectSchema as ShipmentOrderByRelevanceInputObjectSchema } from './ShipmentOrderByRelevanceInput.schema'

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
  order: z.lazy(() => OrderOrderByWithRelationInputObjectSchema).optional(),
  items: z.lazy(() => ShipmentItemOrderByRelationAggregateInputObjectSchema).optional(),
  _relevance: z.lazy(() => ShipmentOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const ShipmentOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ShipmentOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentOrderByWithRelationInput>;
export const ShipmentOrderByWithRelationInputObjectZodSchema = makeSchema();
