import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidWithAggregatesFilterObjectSchema as UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { EnumPaymentStatusNullableWithAggregatesFilterObjectSchema as EnumPaymentStatusNullableWithAggregatesFilterObjectSchema } from './EnumPaymentStatusNullableWithAggregatesFilter.schema';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema';
import { EnumPaymentStatusWithAggregatesFilterObjectSchema as EnumPaymentStatusWithAggregatesFilterObjectSchema } from './EnumPaymentStatusWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema'

const paymentstatushistoryscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => PaymentStatusHistoryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PaymentStatusHistoryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PaymentStatusHistoryScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PaymentStatusHistoryScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PaymentStatusHistoryScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  paymentId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  fromStatus: z.union([z.lazy(() => EnumPaymentStatusNullableWithAggregatesFilterObjectSchema), PaymentStatusSchema]).optional().nullable(),
  toStatus: z.union([z.lazy(() => EnumPaymentStatusWithAggregatesFilterObjectSchema), PaymentStatusSchema]).optional(),
  reason: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  stripeEventId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string().max(255)]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const PaymentStatusHistoryScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryScalarWhereWithAggregatesInput> = paymentstatushistoryscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.PaymentStatusHistoryScalarWhereWithAggregatesInput>;
export const PaymentStatusHistoryScalarWhereWithAggregatesInputObjectZodSchema = paymentstatushistoryscalarwherewithaggregatesinputSchema;
