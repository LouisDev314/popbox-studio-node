import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { OrderCreateNestedOneWithoutStatusHistoryInputObjectSchema as OrderCreateNestedOneWithoutStatusHistoryInputObjectSchema } from './OrderCreateNestedOneWithoutStatusHistoryInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  fromStatus: OrderStatusSchema.optional().nullable(),
  toStatus: OrderStatusSchema,
  reason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  order: z.lazy(() => OrderCreateNestedOneWithoutStatusHistoryInputObjectSchema)
}).strict();
export const OrderStatusHistoryCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryCreateWithoutUserInput>;
export const OrderStatusHistoryCreateWithoutUserInputObjectZodSchema = makeSchema();
