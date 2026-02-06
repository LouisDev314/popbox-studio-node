import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema'

const makeSchema = () => z.object({
  set: PaymentStatusSchema.optional()
}).strict();
export const NullableEnumPaymentStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumPaymentStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableEnumPaymentStatusFieldUpdateOperationsInput>;
export const NullableEnumPaymentStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
