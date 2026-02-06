import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OrderItemCreateNestedOneWithoutShipmentItemsInputObjectSchema as OrderItemCreateNestedOneWithoutShipmentItemsInputObjectSchema } from './OrderItemCreateNestedOneWithoutShipmentItemsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  quantity: z.number().int(),
  orderItem: z.lazy(() => OrderItemCreateNestedOneWithoutShipmentItemsInputObjectSchema)
}).strict();
export const ShipmentItemCreateWithoutShipmentInputObjectSchema: z.ZodType<Prisma.ShipmentItemCreateWithoutShipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemCreateWithoutShipmentInput>;
export const ShipmentItemCreateWithoutShipmentInputObjectZodSchema = makeSchema();
