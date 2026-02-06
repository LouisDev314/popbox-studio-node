import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { EnumOrderStatusNullableFilterObjectSchema as EnumOrderStatusNullableFilterObjectSchema } from './EnumOrderStatusNullableFilter.schema';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { EnumOrderStatusFilterObjectSchema as EnumOrderStatusFilterObjectSchema } from './EnumOrderStatusFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { UuidNullableFilterObjectSchema as UuidNullableFilterObjectSchema } from './UuidNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { OrderScalarRelationFilterObjectSchema as OrderScalarRelationFilterObjectSchema } from './OrderScalarRelationFilter.schema';
import { OrderWhereInputObjectSchema as OrderWhereInputObjectSchema } from './OrderWhereInput.schema';
import { UserNullableScalarRelationFilterObjectSchema as UserNullableScalarRelationFilterObjectSchema } from './UserNullableScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const orderstatushistorywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => OrderStatusHistoryWhereInputObjectSchema), z.lazy(() => OrderStatusHistoryWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OrderStatusHistoryWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OrderStatusHistoryWhereInputObjectSchema), z.lazy(() => OrderStatusHistoryWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  orderId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  fromStatus: z.union([z.lazy(() => EnumOrderStatusNullableFilterObjectSchema), OrderStatusSchema]).optional().nullable(),
  toStatus: z.union([z.lazy(() => EnumOrderStatusFilterObjectSchema), OrderStatusSchema]).optional(),
  reason: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  changedBy: z.union([z.lazy(() => UuidNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  order: z.union([z.lazy(() => OrderScalarRelationFilterObjectSchema), z.lazy(() => OrderWhereInputObjectSchema)]).optional(),
  user: z.union([z.lazy(() => UserNullableScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const OrderStatusHistoryWhereInputObjectSchema: z.ZodType<Prisma.OrderStatusHistoryWhereInput> = orderstatushistorywhereinputSchema as unknown as z.ZodType<Prisma.OrderStatusHistoryWhereInput>;
export const OrderStatusHistoryWhereInputObjectZodSchema = orderstatushistorywhereinputSchema;
