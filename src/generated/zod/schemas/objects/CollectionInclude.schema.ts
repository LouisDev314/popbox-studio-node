import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionFindManySchema as ProductCollectionFindManySchema } from '../findManyProductCollection.schema';
import { CollectionCountOutputTypeArgsObjectSchema as CollectionCountOutputTypeArgsObjectSchema } from './CollectionCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  products: z.union([z.boolean(), z.lazy(() => ProductCollectionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CollectionCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CollectionIncludeObjectSchema: z.ZodType<Prisma.CollectionInclude> = makeSchema() as unknown as z.ZodType<Prisma.CollectionInclude>;
export const CollectionIncludeObjectZodSchema = makeSchema();
