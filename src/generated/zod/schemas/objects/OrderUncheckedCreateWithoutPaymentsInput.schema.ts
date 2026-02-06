import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { OrderItemUncheckedCreateNestedManyWithoutOrderInputObjectSchema as OrderItemUncheckedCreateNestedManyWithoutOrderInputObjectSchema } from './OrderItemUncheckedCreateNestedManyWithoutOrderInput.schema';
import { OrderAddressUncheckedCreateNestedManyWithoutOrderInputObjectSchema as OrderAddressUncheckedCreateNestedManyWithoutOrderInputObjectSchema } from './OrderAddressUncheckedCreateNestedManyWithoutOrderInput.schema';
import { ShipmentUncheckedCreateNestedManyWithoutOrderInputObjectSchema as ShipmentUncheckedCreateNestedManyWithoutOrderInputObjectSchema } from './ShipmentUncheckedCreateNestedManyWithoutOrderInput.schema';
import { OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInputObjectSchema as OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInputObjectSchema } from './OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  orderNumber: z.string(),
  userId: z.string(),
  status: OrderStatusSchema.optional(),
  subtotalAmount: z.bigint(),
  taxAmount: z.bigint().optional(),
  shippingAmount: z.bigint().optional(),
  discountAmount: z.bigint().optional(),
  totalAmount: z.bigint(),
  currency: z.string().optional(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  items: z.lazy(() => OrderItemUncheckedCreateNestedManyWithoutOrderInputObjectSchema).optional(),
  addresses: z.lazy(() => OrderAddressUncheckedCreateNestedManyWithoutOrderInputObjectSchema).optional(),
  shipments: z.lazy(() => ShipmentUncheckedCreateNestedManyWithoutOrderInputObjectSchema).optional(),
  statusHistory: z.lazy(() => OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInputObjectSchema).optional()
}).strict();
export const OrderUncheckedCreateWithoutPaymentsInputObjectSchema: z.ZodType<Prisma.OrderUncheckedCreateWithoutPaymentsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderUncheckedCreateWithoutPaymentsInput>;
export const OrderUncheckedCreateWithoutPaymentsInputObjectZodSchema = makeSchema();
