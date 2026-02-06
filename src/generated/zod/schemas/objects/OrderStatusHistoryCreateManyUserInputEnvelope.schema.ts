import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusHistoryCreateManyUserInputObjectSchema as OrderStatusHistoryCreateManyUserInputObjectSchema } from './OrderStatusHistoryCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => OrderStatusHistoryCreateManyUserInputObjectSchema), z.lazy(() => OrderStatusHistoryCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const OrderStatusHistoryCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.OrderStatusHistoryCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryCreateManyUserInputEnvelope>;
export const OrderStatusHistoryCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
