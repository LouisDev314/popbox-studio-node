import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { EnumOrderStatusNullableFilterObjectSchema as EnumOrderStatusNullableFilterObjectSchema } from './EnumOrderStatusNullableFilter.schema';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { EnumOrderStatusFilterObjectSchema as EnumOrderStatusFilterObjectSchema } from './EnumOrderStatusFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { UuidNullableFilterObjectSchema as UuidNullableFilterObjectSchema } from './UuidNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const orderstatushistoryscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => OrderStatusHistoryScalarWhereInputObjectSchema), z.lazy(() => OrderStatusHistoryScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OrderStatusHistoryScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OrderStatusHistoryScalarWhereInputObjectSchema), z.lazy(() => OrderStatusHistoryScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  orderId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  fromStatus: z.union([z.lazy(() => EnumOrderStatusNullableFilterObjectSchema), OrderStatusSchema]).optional().nullable(),
  toStatus: z.union([z.lazy(() => EnumOrderStatusFilterObjectSchema), OrderStatusSchema]).optional(),
  reason: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  changedBy: z.union([z.lazy(() => UuidNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const OrderStatusHistoryScalarWhereInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryScalarWhereInput> = orderstatushistoryscalarwhereinputSchema as unknown as z.ZodType<Prisma.OrderStatusHistoryScalarWhereInput>;
export const OrderStatusHistoryScalarWhereInputObjectZodSchema = orderstatushistoryscalarwhereinputSchema;
