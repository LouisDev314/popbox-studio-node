import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusSchema } from '../enums/OrderStatus.schema';
import { NestedEnumOrderStatusNullableFilterObjectSchema as NestedEnumOrderStatusNullableFilterObjectSchema } from './NestedEnumOrderStatusNullableFilter.schema'

const makeSchema = () => z.object({
  equals: OrderStatusSchema.optional().nullable(),
  in: OrderStatusSchema.array().optional().nullable(),
  notIn: OrderStatusSchema.array().optional().nullable(),
  not: z.union([OrderStatusSchema, z.lazy(() => NestedEnumOrderStatusNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const EnumOrderStatusNullableFilterObjectSchema: z.ZodType<Prisma.EnumOrderStatusNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumOrderStatusNullableFilter>;
export const EnumOrderStatusNullableFilterObjectZodSchema = makeSchema();
