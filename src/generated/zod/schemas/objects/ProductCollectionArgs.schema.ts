import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionSelectObjectSchema as ProductCollectionSelectObjectSchema } from './ProductCollectionSelect.schema';
import { ProductCollectionIncludeObjectSchema as ProductCollectionIncludeObjectSchema } from './ProductCollectionInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ProductCollectionSelectObjectSchema).optional(),
  include: z.lazy(() => ProductCollectionIncludeObjectSchema).optional()
}).strict();
export const ProductCollectionArgsObjectSchema = makeSchema();
export const ProductCollectionArgsObjectZodSchema = makeSchema();
