import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  collectionId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  sortOrder: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const ProductCollectionUncheckedUpdateWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductCollectionUncheckedUpdateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionUncheckedUpdateWithoutProductInput>;
export const ProductCollectionUncheckedUpdateWithoutProductInputObjectZodSchema = makeSchema();
