import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderItemCreateManyVariantInputObjectSchema as OrderItemCreateManyVariantInputObjectSchema } from './OrderItemCreateManyVariantInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => OrderItemCreateManyVariantInputObjectSchema), z.lazy(() => OrderItemCreateManyVariantInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const OrderItemCreateManyVariantInputEnvelopeObjectSchema: z.ZodType<Prisma.OrderItemCreateManyVariantInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.OrderItemCreateManyVariantInputEnvelope>;
export const OrderItemCreateManyVariantInputEnvelopeObjectZodSchema = makeSchema();
