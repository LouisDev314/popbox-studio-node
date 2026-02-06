import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentCreateNestedOneWithoutItemsInputObjectSchema as ShipmentCreateNestedOneWithoutItemsInputObjectSchema } from './ShipmentCreateNestedOneWithoutItemsInput.schema';
import { OrderItemCreateNestedOneWithoutShipmentItemsInputObjectSchema as OrderItemCreateNestedOneWithoutShipmentItemsInputObjectSchema } from './OrderItemCreateNestedOneWithoutShipmentItemsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  quantity: z.number().int(),
  shipment: z.lazy(() => ShipmentCreateNestedOneWithoutItemsInputObjectSchema),
  orderItem: z.lazy(() => OrderItemCreateNestedOneWithoutShipmentItemsInputObjectSchema)
}).strict();
export const ShipmentItemCreateInputObjectSchema: z.ZodType<Prisma.ShipmentItemCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemCreateInput>;
export const ShipmentItemCreateInputObjectZodSchema = makeSchema();
