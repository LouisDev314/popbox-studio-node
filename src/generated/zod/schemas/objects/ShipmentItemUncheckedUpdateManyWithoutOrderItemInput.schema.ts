import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  shipmentId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const ShipmentItemUncheckedUpdateManyWithoutOrderItemInputObjectSchema: z.ZodType<Prisma.ShipmentItemUncheckedUpdateManyWithoutOrderItemInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemUncheckedUpdateManyWithoutOrderItemInput>;
export const ShipmentItemUncheckedUpdateManyWithoutOrderItemInputObjectZodSchema = makeSchema();
