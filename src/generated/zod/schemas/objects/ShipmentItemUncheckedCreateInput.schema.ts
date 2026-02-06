import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  shipmentId: z.string(),
  orderItemId: z.string(),
  quantity: z.number().int()
}).strict();
export const ShipmentItemUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ShipmentItemUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemUncheckedCreateInput>;
export const ShipmentItemUncheckedCreateInputObjectZodSchema = makeSchema();
