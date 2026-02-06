import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { PaymentStatusHistoryUncheckedCreateNestedManyWithoutPaymentInputObjectSchema as PaymentStatusHistoryUncheckedCreateNestedManyWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryUncheckedCreateNestedManyWithoutPaymentInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  status: PaymentStatusSchema.optional(),
  amount: z.bigint(),
  currency: z.string().optional(),
  stripePaymentIntentId: z.string(),
  stripeChargeId: z.string().optional().nullable(),
  stripeCheckoutSessionId: z.string().optional().nullable(),
  stripeCustomerId: z.string().optional().nullable(),
  idempotencyKey: z.string().optional().nullable(),
  failureCode: z.string().optional().nullable(),
  failureMessage: z.string().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional().nullable(),
  succeededAt: z.coerce.date().optional().nullable(),
  canceledAt: z.coerce.date().optional().nullable(),
  statusHistory: z.lazy(() => PaymentStatusHistoryUncheckedCreateNestedManyWithoutPaymentInputObjectSchema).optional()
}).strict();
export const PaymentUncheckedCreateWithoutOrderInputObjectSchema: z.ZodType<Prisma.PaymentUncheckedCreateWithoutOrderInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentUncheckedCreateWithoutOrderInput>;
export const PaymentUncheckedCreateWithoutOrderInputObjectZodSchema = makeSchema();
