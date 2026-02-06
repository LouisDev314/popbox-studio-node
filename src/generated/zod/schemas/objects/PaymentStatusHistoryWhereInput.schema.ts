import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { EnumPaymentStatusNullableFilterObjectSchema as EnumPaymentStatusNullableFilterObjectSchema } from './EnumPaymentStatusNullableFilter.schema';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema';
import { EnumPaymentStatusFilterObjectSchema as EnumPaymentStatusFilterObjectSchema } from './EnumPaymentStatusFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { PaymentScalarRelationFilterObjectSchema as PaymentScalarRelationFilterObjectSchema } from './PaymentScalarRelationFilter.schema';
import { PaymentWhereInputObjectSchema as PaymentWhereInputObjectSchema } from './PaymentWhereInput.schema'

const paymentstatushistorywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PaymentStatusHistoryWhereInputObjectSchema), z.lazy(() => PaymentStatusHistoryWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PaymentStatusHistoryWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PaymentStatusHistoryWhereInputObjectSchema), z.lazy(() => PaymentStatusHistoryWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  paymentId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  fromStatus: z.union([z.lazy(() => EnumPaymentStatusNullableFilterObjectSchema), PaymentStatusSchema]).optional().nullable(),
  toStatus: z.union([z.lazy(() => EnumPaymentStatusFilterObjectSchema), PaymentStatusSchema]).optional(),
  reason: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  stripeEventId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string().max(255)]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  payment: z.union([z.lazy(() => PaymentScalarRelationFilterObjectSchema), z.lazy(() => PaymentWhereInputObjectSchema)]).optional()
}).strict();
export const PaymentStatusHistoryWhereInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryWhereInput> = paymentstatushistorywhereinputSchema as unknown as z.ZodType<Prisma.PaymentStatusHistoryWhereInput>;
export const PaymentStatusHistoryWhereInputObjectZodSchema = paymentstatushistorywhereinputSchema;
