import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  quantity: z.literal(true).optional()
}).strict();
export const ShipmentItemSumAggregateInputObjectSchema: z.ZodType<Prisma.ShipmentItemSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemSumAggregateInputType>;
export const ShipmentItemSumAggregateInputObjectZodSchema = makeSchema();
