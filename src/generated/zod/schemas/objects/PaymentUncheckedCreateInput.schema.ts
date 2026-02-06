import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { PaymentStatusHistoryUncheckedCreateNestedManyWithoutPaymentInputObjectSchema as PaymentStatusHistoryUncheckedCreateNestedManyWithoutPaymentInputObjectSchema } from './PaymentStatusHistoryUncheckedCreateNestedManyWithoutPaymentInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  orderId: z.string(),
  status: PaymentStatusSchema.optional(),
  amount: z.bigint(),
  currency: z.string().max(3).optional(),
  stripePaymentIntentId: z.string().max(255),
  stripeChargeId: z.string().max(255).optional().nullable(),
  stripeCheckoutSessionId: z.string().max(255).optional().nullable(),
  stripeCustomerId: z.string().max(255).optional().nullable(),
  idempotencyKey: z.string().max(255).optional().nullable(),
  failureCode: z.string().max(100).optional().nullable(),
  failureMessage: z.string().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  succeededAt: z.coerce.date().optional().nullable(),
  canceledAt: z.coerce.date().optional().nullable(),
  statusHistory: z.lazy(() => PaymentStatusHistoryUncheckedCreateNestedManyWithoutPaymentInputObjectSchema).optional()
}).strict();
export const PaymentUncheckedCreateInputObjectSchema: z.ZodType<Prisma.PaymentUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentUncheckedCreateInput>;
export const PaymentUncheckedCreateInputObjectZodSchema = makeSchema();
