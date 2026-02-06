import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema';
import { NestedEnumPaymentStatusNullableFilterObjectSchema as NestedEnumPaymentStatusNullableFilterObjectSchema } from './NestedEnumPaymentStatusNullableFilter.schema'

const makeSchema = () => z.object({
  equals: PaymentStatusSchema.optional().nullable(),
  in: PaymentStatusSchema.array().optional().nullable(),
  notIn: PaymentStatusSchema.array().optional().nullable(),
  not: z.union([PaymentStatusSchema, z.lazy(() => NestedEnumPaymentStatusNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const EnumPaymentStatusNullableFilterObjectSchema: z.ZodType<Prisma.EnumPaymentStatusNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumPaymentStatusNullableFilter>;
export const EnumPaymentStatusNullableFilterObjectZodSchema = makeSchema();
