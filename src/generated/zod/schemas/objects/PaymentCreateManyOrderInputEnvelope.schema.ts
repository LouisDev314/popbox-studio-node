import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PaymentCreateManyOrderInputObjectSchema as PaymentCreateManyOrderInputObjectSchema } from './PaymentCreateManyOrderInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PaymentCreateManyOrderInputObjectSchema), z.lazy(() => PaymentCreateManyOrderInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PaymentCreateManyOrderInputEnvelopeObjectSchema: z.ZodType<Prisma.PaymentCreateManyOrderInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PaymentCreateManyOrderInputEnvelope>;
export const PaymentCreateManyOrderInputEnvelopeObjectZodSchema = makeSchema();
