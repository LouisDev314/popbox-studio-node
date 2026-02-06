import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderArgsObjectSchema as OrderArgsObjectSchema } from './OrderArgs.schema';
import { ShipmentItemFindManySchema as ShipmentItemFindManySchema } from '../findManyShipmentItem.schema';
import { ShipmentCountOutputTypeArgsObjectSchema as ShipmentCountOutputTypeArgsObjectSchema } from './ShipmentCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  orderId: z.boolean().optional(),
  status: z.boolean().optional(),
  carrier: z.boolean().optional(),
  serviceLevel: z.boolean().optional(),
  trackingNumber: z.boolean().optional(),
  trackingUrl: z.boolean().optional(),
  shippedAt: z.boolean().optional(),
  deliveredAt: z.boolean().optional(),
  canceledAt: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  order: z.union([z.boolean(), z.lazy(() => OrderArgsObjectSchema)]).optional(),
  items: z.union([z.boolean(), z.lazy(() => ShipmentItemFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ShipmentCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ShipmentSelectObjectSchema: z.ZodType<Prisma.ShipmentSelect> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentSelect>;
export const ShipmentSelectObjectZodSchema = makeSchema();
