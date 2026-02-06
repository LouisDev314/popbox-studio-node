import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  orderItemId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const ShipmentItemUncheckedUpdateWithoutShipmentInputObjectSchema: z.ZodType<Prisma.ShipmentItemUncheckedUpdateWithoutShipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemUncheckedUpdateWithoutShipmentInput>;
export const ShipmentItemUncheckedUpdateWithoutShipmentInputObjectZodSchema = makeSchema();
