import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { ProductUpdateOneRequiredWithoutCollectionsNestedInputObjectSchema as ProductUpdateOneRequiredWithoutCollectionsNestedInputObjectSchema } from './ProductUpdateOneRequiredWithoutCollectionsNestedInput.schema'

const makeSchema = () => z.object({
  sortOrder: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutCollectionsNestedInputObjectSchema).optional()
}).strict();
export const ProductCollectionUpdateWithoutCollectionInputObjectSchema: z.ZodType<Prisma.ProductCollectionUpdateWithoutCollectionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionUpdateWithoutCollectionInput>;
export const ProductCollectionUpdateWithoutCollectionInputObjectZodSchema = makeSchema();
