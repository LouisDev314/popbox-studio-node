import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { NullableEnumOrderStatusFieldUpdateOperationsInputObjectSchema as NullableEnumOrderStatusFieldUpdateOperationsInputObjectSchema } from './NullableEnumOrderStatusFieldUpdateOperationsInput.schema';
import { EnumOrderStatusFieldUpdateOperationsInputObjectSchema as EnumOrderStatusFieldUpdateOperationsInputObjectSchema } from './EnumOrderStatusFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneWithoutOrderStatusHistoriesNestedInputObjectSchema as UserUpdateOneWithoutOrderStatusHistoriesNestedInputObjectSchema } from './UserUpdateOneWithoutOrderStatusHistoriesNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  fromStatus: z.union([OrderStatusSchema, z.lazy(() => NullableEnumOrderStatusFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  toStatus: z.union([OrderStatusSchema, z.lazy(() => EnumOrderStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  reason: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneWithoutOrderStatusHistoriesNestedInputObjectSchema).optional()
}).strict();
export const OrderStatusHistoryUpdateWithoutOrderInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryUpdateWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryUpdateWithoutOrderInput>;
export const OrderStatusHistoryUpdateWithoutOrderInputObjectZodSchema = makeSchema();
