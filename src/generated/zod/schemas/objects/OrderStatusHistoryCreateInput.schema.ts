import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { OrderCreateNestedOneWithoutStatusHistoryInputObjectSchema as OrderCreateNestedOneWithoutStatusHistoryInputObjectSchema } from './OrderCreateNestedOneWithoutStatusHistoryInput.schema';
import { UserCreateNestedOneWithoutOrderStatusHistoriesInputObjectSchema as UserCreateNestedOneWithoutOrderStatusHistoriesInputObjectSchema } from './UserCreateNestedOneWithoutOrderStatusHistoriesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  fromStatus: OrderStatusSchema.optional().nullable(),
  toStatus: OrderStatusSchema,
  reason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  order: z.lazy(() => OrderCreateNestedOneWithoutStatusHistoryInputObjectSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutOrderStatusHistoriesInputObjectSchema).optional()
}).strict();
export const OrderStatusHistoryCreateInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryCreateInput>;
export const OrderStatusHistoryCreateInputObjectZodSchema = makeSchema();
