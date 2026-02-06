import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  productId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  sortOrder: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const ProductCollectionUncheckedUpdateWithoutCollectionInputObjectSchema: z.ZodType<Prisma.ProductCollectionUncheckedUpdateWithoutCollectionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionUncheckedUpdateWithoutCollectionInput>;
export const ProductCollectionUncheckedUpdateWithoutCollectionInputObjectZodSchema = makeSchema();
