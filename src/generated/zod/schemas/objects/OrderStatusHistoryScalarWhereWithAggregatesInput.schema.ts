import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidWithAggregatesFilterObjectSchema as UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { EnumOrderStatusNullableWithAggregatesFilterObjectSchema as EnumOrderStatusNullableWithAggregatesFilterObjectSchema } from './EnumOrderStatusNullableWithAggregatesFilter.schema';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { EnumOrderStatusWithAggregatesFilterObjectSchema as EnumOrderStatusWithAggregatesFilterObjectSchema } from './EnumOrderStatusWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { UuidNullableWithAggregatesFilterObjectSchema as UuidNullableWithAggregatesFilterObjectSchema } from './UuidNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema'

const orderstatushistoryscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => OrderStatusHistoryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => OrderStatusHistoryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OrderStatusHistoryScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OrderStatusHistoryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => OrderStatusHistoryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  orderId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  fromStatus: z.union([z.lazy(() => EnumOrderStatusNullableWithAggregatesFilterObjectSchema), OrderStatusSchema]).optional().nullable(),
  toStatus: z.union([z.lazy(() => EnumOrderStatusWithAggregatesFilterObjectSchema), OrderStatusSchema]).optional(),
  reason: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  changedBy: z.union([z.lazy(() => UuidNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const OrderStatusHistoryScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryScalarWhereWithAggregatesInput> = orderstatushistoryscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.OrderStatusHistoryScalarWhereWithAggregatesInput>;
export const OrderStatusHistoryScalarWhereWithAggregatesInputObjectZodSchema = orderstatushistoryscalarwherewithaggregatesinputSchema;
