import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderItemCountOutputTypeCountShipmentItemsArgsObjectSchema as OrderItemCountOutputTypeCountShipmentItemsArgsObjectSchema } from './OrderItemCountOutputTypeCountShipmentItemsArgs.schema'

const makeSchema = () => z.object({
  shipmentItems: z.union([z.boolean(), z.lazy(() => OrderItemCountOutputTypeCountShipmentItemsArgsObjectSchema)]).optional()
}).strict();
export const OrderItemCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.OrderItemCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemCountOutputTypeSelect>;
export const OrderItemCountOutputTypeSelectObjectZodSchema = makeSchema();
