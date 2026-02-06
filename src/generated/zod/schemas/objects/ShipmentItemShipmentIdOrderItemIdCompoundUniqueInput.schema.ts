import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  shipmentId: z.string(),
  orderItemId: z.string()
}).strict();
export const ShipmentItemShipmentIdOrderItemIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.ShipmentItemShipmentIdOrderItemIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemShipmentIdOrderItemIdCompoundUniqueInput>;
export const ShipmentItemShipmentIdOrderItemIdCompoundUniqueInputObjectZodSchema = makeSchema();
