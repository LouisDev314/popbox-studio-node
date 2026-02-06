import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderArgsObjectSchema as OrderArgsObjectSchema } from './OrderArgs.schema';
import { ShipmentItemFindManySchema as ShipmentItemFindManySchema } from '../findManyShipmentItem.schema';
import { ShipmentCountOutputTypeArgsObjectSchema as ShipmentCountOutputTypeArgsObjectSchema } from './ShipmentCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  order: z.union([z.boolean(), z.lazy(() => OrderArgsObjectSchema)]).optional(),
  items: z.union([z.boolean(), z.lazy(() => ShipmentItemFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => ShipmentCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const ShipmentIncludeObjectSchema: z.ZodType<Prisma.ShipmentInclude> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentInclude>;
export const ShipmentIncludeObjectZodSchema = makeSchema();
