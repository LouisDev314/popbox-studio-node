import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { UserCreateNestedOneWithoutOrdersInputObjectSchema as UserCreateNestedOneWithoutOrdersInputObjectSchema } from './UserCreateNestedOneWithoutOrdersInput.schema';
import { OrderAddressCreateNestedManyWithoutOrderInputObjectSchema as OrderAddressCreateNestedManyWithoutOrderInputObjectSchema } from './OrderAddressCreateNestedManyWithoutOrderInput.schema';
import { PaymentCreateNestedManyWithoutOrderInputObjectSchema as PaymentCreateNestedManyWithoutOrderInputObjectSchema } from './PaymentCreateNestedManyWithoutOrderInput.schema';
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
  addresses: z.lazy(() => OrderAddressCreateNestedManyWithoutOrderInputObjectSchema).optional(),
  payments: z.lazy(() => PaymentCreateNestedManyWithoutOrderInputObjectSchema).optional(),
  shipments: z.lazy(() => ShipmentCreateNestedManyWithoutOrderInputObjectSchema).optional(),
  statusHistory: z.lazy(() => OrderStatusHistoryCreateNestedManyWithoutOrderInputObjectSchema).optional()
}).strict();
export const OrderCreateWithoutItemsInputObjectSchema: z.ZodType<Prisma.OrderCreateWithoutItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderCreateWithoutItemsInput>;
export const OrderCreateWithoutItemsInputObjectZodSchema = makeSchema();
