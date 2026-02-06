import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentCountOutputTypeCountItemsArgsObjectSchema as ShipmentCountOutputTypeCountItemsArgsObjectSchema } from './ShipmentCountOutputTypeCountItemsArgs.schema'

const makeSchema = () => z.object({
  items: z.union([z.boolean(), z.lazy(() => ShipmentCountOutputTypeCountItemsArgsObjectSchema)]).optional()
}).strict();
export const ShipmentCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.ShipmentCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentCountOutputTypeSelect>;
export const ShipmentCountOutputTypeSelectObjectZodSchema = makeSchema();
