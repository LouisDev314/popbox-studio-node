import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemWhereInputObjectSchema as ShipmentItemWhereInputObjectSchema } from './ShipmentItemWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShipmentItemWhereInputObjectSchema).optional()
}).strict();
export const OrderItemCountOutputTypeCountShipmentItemsArgsObjectSchema = makeSchema();
export const OrderItemCountOutputTypeCountShipmentItemsArgsObjectZodSchema = makeSchema();
