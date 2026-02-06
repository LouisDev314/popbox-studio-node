import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { UserCreateNestedOneWithoutOrdersInputObjectSchema as UserCreateNestedOneWithoutOrdersInputObjectSchema } from './UserCreateNestedOneWithoutOrdersInput.schema';
import { OrderItemCreateNestedManyWithoutOrderInputObjectSchema as OrderItemCreateNestedManyWithoutOrderInputObjectSchema } from './OrderItemCreateNestedManyWithoutOrderInput.schema';
import { OrderAddressCreateNestedManyWithoutOrderInputObjectSchema as OrderAddressCreateNestedManyWithoutOrderInputObjectSchema } from './OrderAddressCreateNestedManyWithoutOrderInput.schema';
import { ShipmentCreateNestedManyWithoutOrderInputObjectSchema as ShipmentCreateNestedManyWithoutOrderInputObjectSchema } from './ShipmentCreateNestedManyWithoutOrderInput.schema';
import { OrderStatusHistoryCreateNestedManyWithoutOrderInputObjectSchema as OrderStatusHistoryCreateNestedManyWithoutOrderInputObjectSchema } from './OrderStatusHistoryCreateNestedManyWithoutOrderInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  orderNumber: z.string().max(32),
  status: OrderStatusSchema.optional(),
  subtotalAmount: z.bigint(),
  taxAmount: z.bigint().optional(),
  shippingAmount: z.bigint().optional(),
  discountAmount: z.bigint().optional(),
  totalAmount: z.bigint(),
  currency: z.string().max(3).optional(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutOrdersInputObjectSchema),
  items: z.lazy(() => OrderItemCreateNestedManyWithoutOrderInputObjectSchema).optional(),
  addresses: z.lazy(() => OrderAddressCreateNestedManyWithoutOrderInputObjectSchema).optional(),
  shipments: z.lazy(() => ShipmentCreateNestedManyWithoutOrderInputObjectSchema).optional(),
  statusHistory: z.lazy(() => OrderStatusHistoryCreateNestedManyWithoutOrderInputObjectSchema).optional()
}).strict();
export const OrderCreateWithoutPaymentsInputObjectSchema: z.ZodType<Prisma.OrderCreateWithoutPaymentsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderCreateWithoutPaymentsInput>;
export const OrderCreateWithoutPaymentsInputObjectZodSchema = makeSchema();
