import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  quantity: z.literal(true).optional()
}).strict();
export const ShipmentItemAvgAggregateInputObjectSchema: z.ZodType<Prisma.ShipmentItemAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemAvgAggregateInputType>;
export const ShipmentItemAvgAggregateInputObjectZodSchema = makeSchema();
