import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { EnumOrderStatusFieldUpdateOperationsInputObjectSchema as EnumOrderStatusFieldUpdateOperationsInputObjectSchema } from './EnumOrderStatusFieldUpdateOperationsInput.schema';
import { BigIntFieldUpdateOperationsInputObjectSchema as BigIntFieldUpdateOperationsInputObjectSchema } from './BigIntFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { OrderItemUncheckedUpdateManyWithoutOrderNestedInputObjectSchema as OrderItemUncheckedUpdateManyWithoutOrderNestedInputObjectSchema } from './OrderItemUncheckedUpdateManyWithoutOrderNestedInput.schema';
import { OrderAddressUncheckedUpdateManyWithoutOrderNestedInputObjectSchema as OrderAddressUncheckedUpdateManyWithoutOrderNestedInputObjectSchema } from './OrderAddressUncheckedUpdateManyWithoutOrderNestedInput.schema';
import { PaymentUncheckedUpdateManyWithoutOrderNestedInputObjectSchema as PaymentUncheckedUpdateManyWithoutOrderNestedInputObjectSchema } from './PaymentUncheckedUpdateManyWithoutOrderNestedInput.schema';
import { ShipmentUncheckedUpdateManyWithoutOrderNestedInputObjectSchema as ShipmentUncheckedUpdateManyWithoutOrderNestedInputObjectSchema } from './ShipmentUncheckedUpdateManyWithoutOrderNestedInput.schema';
import { OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInputObjectSchema as OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInputObjectSchema } from './OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  orderNumber: z.union([z.string().max(32), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([OrderStatusSchema, z.lazy(() => EnumOrderStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  subtotalAmount: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputObjectSchema)]).optional(),
  taxAmount: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputObjectSchema)]).optional(),
  shippingAmount: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputObjectSchema)]).optional(),
  discountAmount: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputObjectSchema)]).optional(),
  totalAmount: z.union([z.bigint(), z.lazy(() => BigIntFieldUpdateOperationsInputObjectSchema)]).optional(),
  currency: z.union([z.string().max(3), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  items: z.lazy(() => OrderItemUncheckedUpdateManyWithoutOrderNestedInputObjectSchema).optional(),
  addresses: z.lazy(() => OrderAddressUncheckedUpdateManyWithoutOrderNestedInputObjectSchema).optional(),
  payments: z.lazy(() => PaymentUncheckedUpdateManyWithoutOrderNestedInputObjectSchema).optional(),
  shipments: z.lazy(() => ShipmentUncheckedUpdateManyWithoutOrderNestedInputObjectSchema).optional(),
  statusHistory: z.lazy(() => OrderStatusHistoryUncheckedUpdateManyWithoutOrderNestedInputObjectSchema).optional()
}).strict();
export const OrderUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.OrderUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderUncheckedUpdateInput>;
export const OrderUncheckedUpdateInputObjectZodSchema = makeSchema();
