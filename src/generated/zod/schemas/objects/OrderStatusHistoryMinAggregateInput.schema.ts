import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  orderId: z.literal(true).optional(),
  fromStatus: z.literal(true).optional(),
  toStatus: z.literal(true).optional(),
  reason: z.literal(true).optional(),
  changedBy: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const OrderStatusHistoryMinAggregateInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryMinAggregateInputType>;
export const OrderStatusHistoryMinAggregateInputObjectZodSchema = makeSchema();
