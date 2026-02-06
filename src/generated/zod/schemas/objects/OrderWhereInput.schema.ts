import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumOrderStatusFilterObjectSchema as EnumOrderStatusFilterObjectSchema } from './EnumOrderStatusFilter.schema';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { BigIntFilterObjectSchema as BigIntFilterObjectSchema } from './BigIntFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { OrderItemListRelationFilterObjectSchema as OrderItemListRelationFilterObjectSchema } from './OrderItemListRelationFilter.schema';
import { OrderAddressListRelationFilterObjectSchema as OrderAddressListRelationFilterObjectSchema } from './OrderAddressListRelationFilter.schema';
import { PaymentListRelationFilterObjectSchema as PaymentListRelationFilterObjectSchema } from './PaymentListRelationFilter.schema';
import { ShipmentListRelationFilterObjectSchema as ShipmentListRelationFilterObjectSchema } from './ShipmentListRelationFilter.schema';
import { OrderStatusHistoryListRelationFilterObjectSchema as OrderStatusHistoryListRelationFilterObjectSchema } from './OrderStatusHistoryListRelationFilter.schema'

const orderwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => OrderWhereInputObjectSchema), z.lazy(() => OrderWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OrderWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OrderWhereInputObjectSchema), z.lazy(() => OrderWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  orderNumber: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(32)]).optional(),
  userId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumOrderStatusFilterObjectSchema), OrderStatusSchema]).optional(),
  subtotalAmount: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional(),
  taxAmount: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional(),
  shippingAmount: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional(),
  discountAmount: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional(),
  totalAmount: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional(),
  currency: z.union([z.lazy(() => StringFilterObjectSchema), z.string().max(3)]).optional(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  items: z.lazy(() => OrderItemListRelationFilterObjectSchema).optional(),
  addresses: z.lazy(() => OrderAddressListRelationFilterObjectSchema).optional(),
  payments: z.lazy(() => PaymentListRelationFilterObjectSchema).optional(),
  shipments: z.lazy(() => ShipmentListRelationFilterObjectSchema).optional(),
  statusHistory: z.lazy(() => OrderStatusHistoryListRelationFilterObjectSchema).optional()
}).strict();
export const OrderWhereInputObjectSchema: z.ZodType<Prisma.OrderWhereInput> = orderwhereinputSchema as unknown as z.ZodType<Prisma.OrderWhereInput>;
export const OrderWhereInputObjectZodSchema = orderwhereinputSchema;
