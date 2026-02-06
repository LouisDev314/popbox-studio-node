import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  shipmentId: z.string(),
  orderItemId: z.string(),
  quantity: z.number().int()
}).strict();
export const ShipmentItemCreateManyInputObjectSchema: z.ZodType<Prisma.ShipmentItemCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemCreateManyInput>;
export const ShipmentItemCreateManyInputObjectZodSchema = makeSchema();
