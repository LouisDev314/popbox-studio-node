import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { OrderItemUncheckedCreateNestedManyWithoutOrderInputObjectSchema as OrderItemUncheckedCreateNestedManyWithoutOrderInputObjectSchema } from './OrderItemUncheckedCreateNestedManyWithoutOrderInput.schema';
import { OrderAddressUncheckedCreateNestedManyWithoutOrderInputObjectSchema as OrderAddressUncheckedCreateNestedManyWithoutOrderInputObjectSchema } from './OrderAddressUncheckedCreateNestedManyWithoutOrderInput.schema';
import { PaymentUncheckedCreateNestedManyWithoutOrderInputObjectSchema as PaymentUncheckedCreateNestedManyWithoutOrderInputObjectSchema } from './PaymentUncheckedCreateNestedManyWithoutOrderInput.schema';
import { ShipmentUncheckedCreateNestedManyWithoutOrderInputObjectSchema as ShipmentUncheckedCreateNestedManyWithoutOrderInputObjectSchema } from './ShipmentUncheckedCreateNestedManyWithoutOrderInput.schema';
import { OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInputObjectSchema as OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInputObjectSchema } from './OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  orderNumber: z.string().max(32),
  userId: z.string(),
  status: OrderStatusSchema.optional(),
  subtotalAmount: z.bigint(),
  taxAmount: z.bigint().optional(),
  shippingAmount: z.bigint().optional(),
  discountAmount: z.bigint().optional(),
  totalAmount: z.bigint(),
  currency: z.string().max(3).optional(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  items: z.lazy(() => OrderItemUncheckedCreateNestedManyWithoutOrderInputObjectSchema).optional(),
  addresses: z.lazy(() => OrderAddressUncheckedCreateNestedManyWithoutOrderInputObjectSchema).optional(),
  payments: z.lazy(() => PaymentUncheckedCreateNestedManyWithoutOrderInputObjectSchema).optional(),
  shipments: z.lazy(() => ShipmentUncheckedCreateNestedManyWithoutOrderInputObjectSchema).optional(),
  statusHistory: z.lazy(() => OrderStatusHistoryUncheckedCreateNestedManyWithoutOrderInputObjectSchema).optional()
}).strict();
export const OrderUncheckedCreateInputObjectSchema: z.ZodType<Prisma.OrderUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrderUncheckedCreateInput>;
export const OrderUncheckedCreateInputObjectZodSchema = makeSchema();
