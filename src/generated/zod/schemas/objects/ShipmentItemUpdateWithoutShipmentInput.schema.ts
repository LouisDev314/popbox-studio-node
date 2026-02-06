import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { OrderItemUpdateOneRequiredWithoutShipmentItemsNestedInputObjectSchema as OrderItemUpdateOneRequiredWithoutShipmentItemsNestedInputObjectSchema } from './OrderItemUpdateOneRequiredWithoutShipmentItemsNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  orderItem: z.lazy(() => OrderItemUpdateOneRequiredWithoutShipmentItemsNestedInputObjectSchema).optional()
}).strict();
export const ShipmentItemUpdateWithoutShipmentInputObjectSchema: z.ZodType<Prisma.ShipmentItemUpdateWithoutShipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemUpdateWithoutShipmentInput>;
export const ShipmentItemUpdateWithoutShipmentInputObjectZodSchema = makeSchema();
