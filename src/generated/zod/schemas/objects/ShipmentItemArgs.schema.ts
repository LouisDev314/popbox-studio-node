import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemSelectObjectSchema as ShipmentItemSelectObjectSchema } from './ShipmentItemSelect.schema';
import { ShipmentItemIncludeObjectSchema as ShipmentItemIncludeObjectSchema } from './ShipmentItemInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ShipmentItemSelectObjectSchema).optional(),
  include: z.lazy(() => ShipmentItemIncludeObjectSchema).optional()
}).strict();
export const ShipmentItemArgsObjectSchema = makeSchema();
export const ShipmentItemArgsObjectZodSchema = makeSchema();
