import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { OrderCreateNestedOneWithoutPaymentsInputObjectSchema as OrderCreateNestedOneWithoutPaymentsInputObjectSchema } from './OrderCreateNestedOneWithoutPaymentsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
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
  updatedAt: z.coerce.date().optional().nullable(),
  succeededAt: z.coerce.date().optional().nullable(),
  canceledAt: z.coerce.date().optional().nullable(),
  order: z.lazy(() => OrderCreateNestedOneWithoutPaymentsInputObjectSchema)
}).strict();
export const PaymentCreateWithoutStatusHistoryInputObjectSchema: z.ZodType<Prisma.PaymentCreateWithoutStatusHistoryInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentCreateWithoutStatusHistoryInput>;
export const PaymentCreateWithoutStatusHistoryInputObjectZodSchema = makeSchema();
