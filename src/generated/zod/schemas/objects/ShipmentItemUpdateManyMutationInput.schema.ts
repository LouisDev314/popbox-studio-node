import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  quantity: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const ShipmentItemUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.ShipmentItemUpdateManyMutationInput> = makeSchema() as unknown as z.ZodType<Prisma.ShipmentItemUpdateManyMutationInput>;
export const ShipmentItemUpdateManyMutationInputObjectZodSchema = makeSchema();
