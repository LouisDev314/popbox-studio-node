import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemWhereInputObjectSchema as ShipmentItemWhereInputObjectSchema } from './ShipmentItemWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ShipmentItemWhereInputObjectSchema).optional(),
  some: z.lazy(() => ShipmentItemWhereInputObjectSchema).optional(),
  none: z.lazy(() => ShipmentItemWhereInputObjectSchema).optional()
}).strict();
export const ShipmentItemListRelationFilterObjectSchema: z.ZodType<Prisma.ShipmentItemListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemListRelationFilter>;
export const ShipmentItemListRelationFilterObjectZodSchema = makeSchema();
