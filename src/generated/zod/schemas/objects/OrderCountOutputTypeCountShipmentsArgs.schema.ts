import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentWhereInputObjectSchema as ShipmentWhereInputObjectSchema } from './ShipmentWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShipmentWhereInputObjectSchema).optional()
}).strict();
export const OrderCountOutputTypeCountShipmentsArgsObjectSchema = makeSchema();
export const OrderCountOutputTypeCountShipmentsArgsObjectZodSchema = makeSchema();
