import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { NestedEnumOrderStatusNullableWithAggregatesFilterObjectSchema as NestedEnumOrderStatusNullableWithAggregatesFilterObjectSchema } from './NestedEnumOrderStatusNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumOrderStatusNullableFilterObjectSchema as NestedEnumOrderStatusNullableFilterObjectSchema } from './NestedEnumOrderStatusNullableFilter.schema'

const makeSchema = () => z.object({
  equals: OrderStatusSchema.optional().nullable(),
  in: OrderStatusSchema.array().optional().nullable(),
  notIn: OrderStatusSchema.array().optional().nullable(),
  not: z.union([OrderStatusSchema, z.lazy(() => NestedEnumOrderStatusNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumOrderStatusNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumOrderStatusNullableFilterObjectSchema).optional()
}).strict();
export const EnumOrderStatusNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumOrderStatusNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumOrderStatusNullableWithAggregatesFilter>;
export const EnumOrderStatusNullableWithAggregatesFilterObjectZodSchema = makeSchema();
