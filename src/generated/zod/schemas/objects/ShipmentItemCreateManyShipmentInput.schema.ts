import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  orderItemId: z.string(),
  quantity: z.number().int()
}).strict();
export const ShipmentItemCreateManyShipmentInputObjectSchema: z.ZodType<Prisma.ShipmentItemCreateManyShipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemCreateManyShipmentInput>;
export const ShipmentItemCreateManyShipmentInputObjectZodSchema = makeSchema();
