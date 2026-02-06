import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductArgsObjectSchema as ProductArgsObjectSchema } from './ProductArgs.schema';
import { CollectionArgsObjectSchema as CollectionArgsObjectSchema } from './CollectionArgs.schema'

const makeSchema = () => z.object({
  productId: z.boolean().optional(),
  collectionId: z.boolean().optional(),
  sortOrder: z.boolean().optional(),
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional(),
  collection: z.union([z.boolean(), z.lazy(() => CollectionArgsObjectSchema)]).optional()
}).strict();
export const ProductCollectionSelectObjectSchema: z.ZodType<Prisma.ProductCollectionSelect> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionSelect>;
export const ProductCollectionSelectObjectZodSchema = makeSchema();
