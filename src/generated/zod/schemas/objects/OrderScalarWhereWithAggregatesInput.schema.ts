import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidWithAggregatesFilterObjectSchema as UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumOrderStatusWithAggregatesFilterObjectSchema as EnumOrderStatusWithAggregatesFilterObjectSchema } from './EnumOrderStatusWithAggregatesFilter.schema';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { BigIntWithAggregatesFilterObjectSchema as BigIntWithAggregatesFilterObjectSchema } from './BigIntWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema'

const orderscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => OrderScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => OrderScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OrderScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OrderScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => OrderScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  orderNumber: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(32)]).optional(),
  userId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumOrderStatusWithAggregatesFilterObjectSchema), OrderStatusSchema]).optional(),
  subtotalAmount: z.union([z.lazy(() => BigIntWithAggregatesFilterObjectSchema), z.bigint()]).optional(),
  taxAmount: z.union([z.lazy(() => BigIntWithAggregatesFilterObjectSchema), z.bigint()]).optional(),
  shippingAmount: z.union([z.lazy(() => BigIntWithAggregatesFilterObjectSchema), z.bigint()]).optional(),
  discountAmount: z.union([z.lazy(() => BigIntWithAggregatesFilterObjectSchema), z.bigint()]).optional(),
  totalAmount: z.union([z.lazy(() => BigIntWithAggregatesFilterObjectSchema), z.bigint()]).optional(),
  currency: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string().max(3)]).optional(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const OrderScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.OrderScalarWhereWithAggregatesInput> = orderscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.OrderScalarWhereWithAggregatesInput>;
export const OrderScalarWhereWithAggregatesInputObjectZodSchema = orderscalarwherewithaggregatesinputSchema;
