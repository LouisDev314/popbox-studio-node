import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  shipmentId: z.string(),
  quantity: z.number().int()
}).strict();
export const ShipmentItemUncheckedCreateWithoutOrderItemInputObjectSchema: z.ZodType<Prisma.ShipmentItemUncheckedCreateWithoutOrderItemInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemUncheckedCreateWithoutOrderItemInput>;
export const ShipmentItemUncheckedCreateWithoutOrderItemInputObjectZodSchema = makeSchema();
