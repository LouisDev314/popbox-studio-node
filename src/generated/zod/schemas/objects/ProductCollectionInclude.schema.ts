import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductArgsObjectSchema as ProductArgsObjectSchema } from './ProductArgs.schema';
import { CollectionArgsObjectSchema as CollectionArgsObjectSchema } from './CollectionArgs.schema'

const makeSchema = () => z.object({
  product: z.union([z.boolean(), z.lazy(() => ProductArgsObjectSchema)]).optional(),
  collection: z.union([z.boolean(), z.lazy(() => CollectionArgsObjectSchema)]).optional()
}).strict();
export const ProductCollectionIncludeObjectSchema: z.ZodType<Prisma.ProductCollectionInclude> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionInclude>;
export const ProductCollectionIncludeObjectZodSchema = makeSchema();
