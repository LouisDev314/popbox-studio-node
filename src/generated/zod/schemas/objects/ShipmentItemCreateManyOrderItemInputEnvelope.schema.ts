import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemCreateManyOrderItemInputObjectSchema as ShipmentItemCreateManyOrderItemInputObjectSchema } from './ShipmentItemCreateManyOrderItemInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ShipmentItemCreateManyOrderItemInputObjectSchema), z.lazy(() => ShipmentItemCreateManyOrderItemInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ShipmentItemCreateManyOrderItemInputEnvelopeObjectSchema: z.ZodType<Prisma.ShipmentItemCreateManyOrderItemInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemCreateManyOrderItemInputEnvelope>;
export const ShipmentItemCreateManyOrderItemInputEnvelopeObjectZodSchema = makeSchema();
