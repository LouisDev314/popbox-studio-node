import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { CollectionUpdateOneRequiredWithoutProductsNestedInputObjectSchema as CollectionUpdateOneRequiredWithoutProductsNestedInputObjectSchema } from './CollectionUpdateOneRequiredWithoutProductsNestedInput.schema'

const makeSchema = () => z.object({
  sortOrder: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  collection: z.lazy(() => CollectionUpdateOneRequiredWithoutProductsNestedInputObjectSchema).optional()
}).strict();
export const ProductCollectionUpdateWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductCollectionUpdateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionUpdateWithoutProductInput>;
export const ProductCollectionUpdateWithoutProductInputObjectZodSchema = makeSchema();
