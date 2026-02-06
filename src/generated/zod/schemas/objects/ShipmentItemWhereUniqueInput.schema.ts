import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentItemShipmentIdOrderItemIdCompoundUniqueInputObjectSchema as ShipmentItemShipmentIdOrderItemIdCompoundUniqueInputObjectSchema } from './ShipmentItemShipmentIdOrderItemIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  shipmentId_orderItemId: z.lazy(() => ShipmentItemShipmentIdOrderItemIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const ShipmentItemWhereUniqueInputObjectSchema: z.ZodType<Prisma.ShipmentItemWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemWhereUniqueInput>;
export const ShipmentItemWhereUniqueInputObjectZodSchema = makeSchema();
