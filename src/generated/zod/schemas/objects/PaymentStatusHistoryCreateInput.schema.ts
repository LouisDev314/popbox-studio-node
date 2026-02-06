import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema';
import { PaymentCreateNestedOneWithoutStatusHistoryInputObjectSchema as PaymentCreateNestedOneWithoutStatusHistoryInputObjectSchema } from './PaymentCreateNestedOneWithoutStatusHistoryInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  fromStatus: PaymentStatusSchema.optional().nullable(),
  toStatus: PaymentStatusSchema,
  reason: z.string().optional().nullable(),
  stripeEventId: z.string().max(255).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  payment: z.lazy(() => PaymentCreateNestedOneWithoutStatusHistoryInputObjectSchema)
}).strict();
export const PaymentStatusHistoryCreateInputObjectSchema: z.ZodType<Prisma.PaymentStatusHistoryCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentStatusHistoryCreateInput>;
export const PaymentStatusHistoryCreateInputObjectZodSchema = makeSchema();
