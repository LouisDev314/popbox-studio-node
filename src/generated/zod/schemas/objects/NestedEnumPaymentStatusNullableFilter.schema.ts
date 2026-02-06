import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema'

const nestedenumpaymentstatusnullablefilterSchema = z.object({
  equals: PaymentStatusSchema.optional().nullable(),
  in: PaymentStatusSchema.array().optional().nullable(),
  notIn: PaymentStatusSchema.array().optional().nullable(),
  not: z.union([PaymentStatusSchema, z.lazy(() => NestedEnumPaymentStatusNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const NestedEnumPaymentStatusNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumPaymentStatusNullableFilter> = nestedenumpaymentstatusnullablefilterSchema as unknown as z.ZodType<Prisma.NestedEnumPaymentStatusNullableFilter>;
export const NestedEnumPaymentStatusNullableFilterObjectZodSchema = nestedenumpaymentstatusnullablefilterSchema;
