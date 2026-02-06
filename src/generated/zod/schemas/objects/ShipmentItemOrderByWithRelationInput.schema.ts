import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ShipmentOrderByWithRelationInputObjectSchema as ShipmentOrderByWithRelationInputObjectSchema } from './ShipmentOrderByWithRelationInput.schema';
import { OrderItemOrderByWithRelationInputObjectSchema as OrderItemOrderByWithRelationInputObjectSchema } from './OrderItemOrderByWithRelationInput.schema';
import { ShipmentItemOrderByRelevanceInputObjectSchema as ShipmentItemOrderByRelevanceInputObjectSchema } from './ShipmentItemOrderByRelevanceInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  shipmentId: SortOrderSchema.optional(),
  orderItemId: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  shipment: z.lazy(() => ShipmentOrderByWithRelationInputObjectSchema).optional(),
  orderItem: z.lazy(() => OrderItemOrderByWithRelationInputObjectSchema).optional(),
  _relevance: z.lazy(() => ShipmentItemOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const ShipmentItemOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ShipmentItemOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemOrderByWithRelationInput>;
export const ShipmentItemOrderByWithRelationInputObjectZodSchema = makeSchema();
