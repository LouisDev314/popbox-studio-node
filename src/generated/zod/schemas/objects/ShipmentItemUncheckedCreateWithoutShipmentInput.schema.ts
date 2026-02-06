import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  orderItemId: z.string(),
  quantity: z.number().int()
}).strict();
export const ShipmentItemUncheckedCreateWithoutShipmentInputObjectSchema: z.ZodType<Prisma.ShipmentItemUncheckedCreateWithoutShipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemUncheckedCreateWithoutShipmentInput>;
export const ShipmentItemUncheckedCreateWithoutShipmentInputObjectZodSchema = makeSchema();
