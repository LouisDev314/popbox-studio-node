import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { EnumPaymentStatusNullableFilterObjectSchema as EnumPaymentStatusNullableFilterObjectSchema } from './EnumPaymentStatusNullableFilter.schema';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema';
import { EnumPaymentStatusFilterObjectSchema as EnumPaymentStatusFilterObjectSchema } from './EnumPaymentStatusFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const paymentstatushistoryscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PaymentStatusHistoryScalarWhereInputObjectSchema), z.lazy(() => PaymentStatusHistoryScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PaymentStatusHistoryScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PaymentStatusHistoryScalarWhereInputObjectSchema), z.lazy(() => PaymentStatusHistoryScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  paymentId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  fromStatus: z.union([z.lazy(() => EnumPaymentStatusNullableFilterObjectSchema), PaymentStatusSchema]).optional().nullable(),
  toStatus: z.union([z.lazy(() => EnumPaymentStatusFilterObjectSchema), PaymentStatusSchema]).optional(),
  reason: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  stripeEventId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const PaymentStatusHistoryScalarWhereInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryScalarWhereInput> = paymentstatushistoryscalarwhereinputSchema as unknown as z.ZodType<Prisma.PaymentStatusHistoryScalarWhereInput>;
export const PaymentStatusHistoryScalarWhereInputObjectZodSchema = paymentstatushistoryscalarwhereinputSchema;
