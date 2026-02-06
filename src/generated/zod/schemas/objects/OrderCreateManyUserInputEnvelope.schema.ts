import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderCreateManyUserInputObjectSchema as OrderCreateManyUserInputObjectSchema } from './OrderCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => OrderCreateManyUserInputObjectSchema), z.lazy(() => OrderCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const OrderCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.OrderCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.OrderCreateManyUserInputEnvelope>;
export const OrderCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
