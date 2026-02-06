import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { UserCreateNestedOneWithoutOrderStatusHistoriesInputObjectSchema as UserCreateNestedOneWithoutOrderStatusHistoriesInputObjectSchema } from './UserCreateNestedOneWithoutOrderStatusHistoriesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  fromStatus: OrderStatusSchema.optional().nullable(),
  toStatus: OrderStatusSchema,
  reason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutOrderStatusHistoriesInputObjectSchema).optional()
}).strict();
export const OrderStatusHistoryCreateWithoutOrderInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryCreateWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryCreateWithoutOrderInput>;
export const OrderStatusHistoryCreateWithoutOrderInputObjectZodSchema = makeSchema();
