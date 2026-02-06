import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  shipmentId: z.literal(true).optional(),
  orderItemId: z.literal(true).optional(),
  quantity: z.literal(true).optional()
}).strict();
export const ShipmentItemMaxAggregateInputObjectSchema: z.ZodType<Prisma.ShipmentItemMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemMaxAggregateInputType>;
export const ShipmentItemMaxAggregateInputObjectZodSchema = makeSchema();
