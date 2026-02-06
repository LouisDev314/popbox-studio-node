import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema';
import { NestedEnumPaymentStatusNullableWithAggregatesFilterObjectSchema as NestedEnumPaymentStatusNullableWithAggregatesFilterObjectSchema } from './NestedEnumPaymentStatusNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumPaymentStatusNullableFilterObjectSchema as NestedEnumPaymentStatusNullableFilterObjectSchema } from './NestedEnumPaymentStatusNullableFilter.schema'

const makeSchema = () => z.object({
  equals: PaymentStatusSchema.optional().nullable(),
  in: PaymentStatusSchema.array().optional().nullable(),
  notIn: PaymentStatusSchema.array().optional().nullable(),
  not: z.union([PaymentStatusSchema, z.lazy(() => NestedEnumPaymentStatusNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumPaymentStatusNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumPaymentStatusNullableFilterObjectSchema).optional()
}).strict();
export const EnumPaymentStatusNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumPaymentStatusNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumPaymentStatusNullableWithAggregatesFilter>;
export const EnumPaymentStatusNullableWithAggregatesFilterObjectZodSchema = makeSchema();
