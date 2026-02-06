import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumPaymentStatusNullableFilterObjectSchema as NestedEnumPaymentStatusNullableFilterObjectSchema } from './NestedEnumPaymentStatusNullableFilter.schema'

const nestedenumpaymentstatusnullablewithaggregatesfilterSchema = z.object({
  equals: PaymentStatusSchema.optional().nullable(),
  in: PaymentStatusSchema.array().optional().nullable(),
  notIn: PaymentStatusSchema.array().optional().nullable(),
  not: z.union([PaymentStatusSchema, z.lazy(() => NestedEnumPaymentStatusNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumPaymentStatusNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumPaymentStatusNullableFilterObjectSchema).optional()
}).strict();
export const NestedEnumPaymentStatusNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumPaymentStatusNullableWithAggregatesFilter> = nestedenumpaymentstatusnullablewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumPaymentStatusNullableWithAggregatesFilter>;
export const NestedEnumPaymentStatusNullableWithAggregatesFilterObjectZodSchema = nestedenumpaymentstatusnullablewithaggregatesfilterSchema;
