import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { ShipmentUpdateOneRequiredWithoutItemsNestedInputObjectSchema as ShipmentUpdateOneRequiredWithoutItemsNestedInputObjectSchema } from './ShipmentUpdateOneRequiredWithoutItemsNestedInput.schema';
import { OrderItemUpdateOneRequiredWithoutShipmentItemsNestedInputObjectSchema as OrderItemUpdateOneRequiredWithoutShipmentItemsNestedInputObjectSchema } from './OrderItemUpdateOneRequiredWithoutShipmentItemsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  shipment: z.lazy(() => ShipmentUpdateOneRequiredWithoutItemsNestedInputObjectSchema).optional(),
  orderItem: z.lazy(() => OrderItemUpdateOneRequiredWithoutShipmentItemsNestedInputObjectSchema).optional()
}).strict();
export const ShipmentItemUpdateInputObjectSchema: z.ZodType<Prisma.ShipmentItemUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemUpdateInput>;
export const ShipmentItemUpdateInputObjectZodSchema = makeSchema();
