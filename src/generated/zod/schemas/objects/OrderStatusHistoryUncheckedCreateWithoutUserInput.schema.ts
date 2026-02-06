import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusSchema } from '../enums/OrderStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  orderId: z.string(),
  fromStatus: OrderStatusSchema.optional().nullable(),
  toStatus: OrderStatusSchema,
  reason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();
export const OrderStatusHistoryUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryUncheckedCreateWithoutUserInput>;
export const OrderStatusHistoryUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
