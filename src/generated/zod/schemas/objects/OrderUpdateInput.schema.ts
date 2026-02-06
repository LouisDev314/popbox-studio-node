import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { EnumOrderStatusFieldUpdateOperationsInputObjectSchema as EnumOrderStatusFieldUpdateOperationsInputObjectSchema } from './EnumOrderStatusFieldUpdateOperationsInput.schema';
import { BigIntFieldUpdateOperationsInputObjectSchema as BigIntFieldUpdateOperationsInputObjectSchema } from './BigIntFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutOrdersNestedInputObjectSchema as UserUpdateOneRequiredWithoutOrdersNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutOrdersNestedInput.schema';
import { OrderItemUpdateManyWithoutOrderNestedInputObjectSchema as OrderItemUpdateManyWithoutOrderNestedInputObjectSchema } from './OrderItemUpdateManyWithoutOrderNestedInput.schema';
import { OrderAddressUpdateManyWithoutOrderNestedInputObjectSchema as OrderAddressUpdateManyWithoutOrderNestedInputObjectSchema } from './OrderAddressUpdateManyWithoutOrderNestedInput.schema';
import { PaymentUpdateManyWithoutOrderNestedInputObjectSchema as PaymentUpdateManyWithoutOrderNestedInputObjectSchema } from './PaymentUpdateManyWithoutOrderNestedInput.schema';
import { ShipmentUpdateManyWithoutOrderNestedInputObjectSchema as ShipmentUpdateManyWithoutOrderNestedInputObjectSchema } from './ShipmentUpdateManyWithoutOrderNestedInput.schema';
import { OrderStatusHistoryUpdateManyWithoutOrderNestedInputObjectSchema as OrderStatusHistoryUpdateManyWithoutOrderNestedInputObjectSchema } from './OrderStatusHistoryUpdateManyWithoutOrderNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  orderNumber: z.union([z.string().max(32), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
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
  user: z.lazy(() => UserUpdateOneRequiredWithoutOrdersNestedInputObjectSchema).optional(),
  items: z.lazy(() => OrderItemUpdateManyWithoutOrderNestedInputObjectSchema).optional(),
  addresses: z.lazy(() => OrderAddressUpdateManyWithoutOrderNestedInputObjectSchema).optional(),
  payments: z.lazy(() => PaymentUpdateManyWithoutOrderNestedInputObjectSchema).optional(),
  shipments: z.lazy(() => ShipmentUpdateManyWithoutOrderNestedInputObjectSchema).optional(),
  statusHistory: z.lazy(() => OrderStatusHistoryUpdateManyWithoutOrderNestedInputObjectSchema).optional()
}).strict();
export const OrderUpdateInputObjectSchema: z.ZodType<Prisma.OrderUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderUpdateInput>;
export const OrderUpdateInputObjectZodSchema = makeSchema();
