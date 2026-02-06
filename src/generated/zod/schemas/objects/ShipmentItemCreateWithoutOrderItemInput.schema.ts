import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ShipmentCreateNestedOneWithoutItemsInputObjectSchema as ShipmentCreateNestedOneWithoutItemsInputObjectSchema } from './ShipmentCreateNestedOneWithoutItemsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  quantity: z.number().int(),
  shipment: z.lazy(() => ShipmentCreateNestedOneWithoutItemsInputObjectSchema)
}).strict();
export const ShipmentItemCreateWithoutOrderItemInputObjectSchema: z.ZodType<Prisma.ShipmentItemCreateWithoutOrderItemInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemCreateWithoutOrderItemInput>;
export const ShipmentItemCreateWithoutOrderItemInputObjectZodSchema = makeSchema();
