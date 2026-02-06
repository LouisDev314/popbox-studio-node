import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderStatusHistoryCreateManyOrderInputObjectSchema as OrderStatusHistoryCreateManyOrderInputObjectSchema } from './OrderStatusHistoryCreateManyOrderInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => OrderStatusHistoryCreateManyOrderInputObjectSchema), z.lazy(() => OrderStatusHistoryCreateManyOrderInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const OrderStatusHistoryCreateManyOrderInputEnvelopeObjectSchema: z.ZodType<Prisma.OrderStatusHistoryCreateManyOrderInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.OrderStatusHistoryCreateManyOrderInputEnvelope>;
export const OrderStatusHistoryCreateManyOrderInputEnvelopeObjectZodSchema = makeSchema();
