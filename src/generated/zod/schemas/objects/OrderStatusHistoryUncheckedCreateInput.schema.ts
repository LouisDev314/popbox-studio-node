import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusSchema } from '../enums/OrderStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  orderId: z.string(),
  fromStatus: OrderStatusSchema.optional().nullable(),
  toStatus: OrderStatusSchema,
  reason: z.string().optional().nullable(),
  changedBy: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const OrderStatusHistoryUncheckedCreateInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryUncheckedCreateInput>;
export const OrderStatusHistoryUncheckedCreateInputObjectZodSchema = makeSchema();
