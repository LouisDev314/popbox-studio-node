import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumOrderStatusFilterObjectSchema as EnumOrderStatusFilterObjectSchema } from './EnumOrderStatusFilter.schema';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { BigIntFilterObjectSchema as BigIntFilterObjectSchema } from './BigIntFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const orderscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => OrderScalarWhereInputObjectSchema), z.lazy(() => OrderScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OrderScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OrderScalarWhereInputObjectSchema), z.lazy(() => OrderScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  orderNumber: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumOrderStatusFilterObjectSchema), OrderStatusSchema]).optional(),
  subtotalAmount: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional(),
  taxAmount: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional(),
  shippingAmount: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional(),
  discountAmount: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional(),
  totalAmount: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional(),
  currency: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const OrderScalarWhereInputObjectSchema: z.ZodType<Prisma.OrderScalarWhereInput> = orderscalarwhereinputSchema as unknown as z.ZodType<Prisma.OrderScalarWhereInput>;
export const OrderScalarWhereInputObjectZodSchema = orderscalarwhereinputSchema;
