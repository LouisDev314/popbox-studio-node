import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentArgsObjectSchema as ShipmentArgsObjectSchema } from './ShipmentArgs.schema';
import { OrderItemArgsObjectSchema as OrderItemArgsObjectSchema } from './OrderItemArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  shipmentId: z.boolean().optional(),
  orderItemId: z.boolean().optional(),
  quantity: z.boolean().optional(),
  shipment: z.union([z.boolean(), z.lazy(() => ShipmentArgsObjectSchema)]).optional(),
  orderItem: z.union([z.boolean(), z.lazy(() => OrderItemArgsObjectSchema)]).optional()
}).strict();
export const ShipmentItemSelectObjectSchema: z.ZodType<Prisma.ShipmentItemSelect> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemSelect>;
export const ShipmentItemSelectObjectZodSchema = makeSchema();
