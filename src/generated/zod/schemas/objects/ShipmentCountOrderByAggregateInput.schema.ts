import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  orderId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  carrier: SortOrderSchema.optional(),
  serviceLevel: SortOrderSchema.optional(),
  trackingNumber: SortOrderSchema.optional(),
  trackingUrl: SortOrderSchema.optional(),
  shippedAt: SortOrderSchema.optional(),
  deliveredAt: SortOrderSchema.optional(),
  canceledAt: SortOrderSchema.optional(),
  metadata: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ShipmentCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ShipmentCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentCountOrderByAggregateInput>;
export const ShipmentCountOrderByAggregateInputObjectZodSchema = makeSchema();
