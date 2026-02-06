import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderAddressCreateManyOrderInputObjectSchema as OrderAddressCreateManyOrderInputObjectSchema } from './OrderAddressCreateManyOrderInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => OrderAddressCreateManyOrderInputObjectSchema), z.lazy(() => OrderAddressCreateManyOrderInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const OrderAddressCreateManyOrderInputEnvelopeObjectSchema: z.ZodType<Prisma.OrderAddressCreateManyOrderInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.OrderAddressCreateManyOrderInputEnvelope>;
export const OrderAddressCreateManyOrderInputEnvelopeObjectZodSchema = makeSchema();
