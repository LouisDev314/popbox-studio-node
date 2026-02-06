import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemCreateManyShipmentInputObjectSchema as ShipmentItemCreateManyShipmentInputObjectSchema } from './ShipmentItemCreateManyShipmentInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ShipmentItemCreateManyShipmentInputObjectSchema), z.lazy(() => ShipmentItemCreateManyShipmentInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ShipmentItemCreateManyShipmentInputEnvelopeObjectSchema: z.ZodType<Prisma.ShipmentItemCreateManyShipmentInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemCreateManyShipmentInputEnvelope>;
export const ShipmentItemCreateManyShipmentInputEnvelopeObjectZodSchema = makeSchema();
