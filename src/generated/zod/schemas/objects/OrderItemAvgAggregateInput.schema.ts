import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  quantity: z.literal(true).optional(),
  unitPrice: z.literal(true).optional()
}).strict();
export const OrderItemAvgAggregateInputObjectSchema: z.ZodType<Prisma.OrderItemAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemAvgAggregateInputType>;
export const OrderItemAvgAggregateInputObjectZodSchema = makeSchema();
