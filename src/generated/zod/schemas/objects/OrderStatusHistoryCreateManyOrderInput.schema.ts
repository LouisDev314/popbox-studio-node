import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusSchema } from '../enums/OrderStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  fromStatus: OrderStatusSchema.optional().nullable(),
  toStatus: OrderStatusSchema,
  reason: z.string().optional().nullable(),
  changedBy: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();
export const OrderStatusHistoryCreateManyOrderInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryCreateManyOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryCreateManyOrderInput>;
export const OrderStatusHistoryCreateManyOrderInputObjectZodSchema = makeSchema();
