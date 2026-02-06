import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumOrderStatusNullableFilterObjectSchema as NestedEnumOrderStatusNullableFilterObjectSchema } from './NestedEnumOrderStatusNullableFilter.schema'

const nestedenumorderstatusnullablewithaggregatesfilterSchema = z.object({
  equals: OrderStatusSchema.optional().nullable(),
  in: OrderStatusSchema.array().optional().nullable(),
  notIn: OrderStatusSchema.array().optional().nullable(),
  not: z.union([OrderStatusSchema, z.lazy(() => NestedEnumOrderStatusNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumOrderStatusNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumOrderStatusNullableFilterObjectSchema).optional()
}).strict();
export const NestedEnumOrderStatusNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumOrderStatusNullableWithAggregatesFilter> = nestedenumorderstatusnullablewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumOrderStatusNullableWithAggregatesFilter>;
export const NestedEnumOrderStatusNullableWithAggregatesFilterObjectZodSchema = nestedenumorderstatusnullablewithaggregatesfilterSchema;
