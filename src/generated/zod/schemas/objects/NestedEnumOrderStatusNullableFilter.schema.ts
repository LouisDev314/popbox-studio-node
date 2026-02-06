import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusSchema } from '../enums/OrderStatus.schema'

const nestedenumorderstatusnullablefilterSchema = z.object({
  equals: OrderStatusSchema.optional().nullable(),
  in: OrderStatusSchema.array().optional().nullable(),
  notIn: OrderStatusSchema.array().optional().nullable(),
  not: z.union([OrderStatusSchema, z.lazy(() => NestedEnumOrderStatusNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const NestedEnumOrderStatusNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumOrderStatusNullableFilter> = nestedenumorderstatusnullablefilterSchema as unknown as z.ZodType<Prisma.NestedEnumOrderStatusNullableFilter>;
export const NestedEnumOrderStatusNullableFilterObjectZodSchema = nestedenumorderstatusnullablefilterSchema;
