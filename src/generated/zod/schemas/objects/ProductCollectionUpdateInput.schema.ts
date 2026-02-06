import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { ProductUpdateOneRequiredWithoutCollectionsNestedInputObjectSchema as ProductUpdateOneRequiredWithoutCollectionsNestedInputObjectSchema } from './ProductUpdateOneRequiredWithoutCollectionsNestedInput.schema';
import { CollectionUpdateOneRequiredWithoutProductsNestedInputObjectSchema as CollectionUpdateOneRequiredWithoutProductsNestedInputObjectSchema } from './CollectionUpdateOneRequiredWithoutProductsNestedInput.schema'

const makeSchema = () => z.object({
  sortOrder: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutCollectionsNestedInputObjectSchema).optional(),
  collection: z.lazy(() => CollectionUpdateOneRequiredWithoutProductsNestedInputObjectSchema).optional()
}).strict();
export const ProductCollectionUpdateInputObjectSchema: z.ZodType<Prisma.ProductCollectionUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionUpdateInput>;
export const ProductCollectionUpdateInputObjectZodSchema = makeSchema();
