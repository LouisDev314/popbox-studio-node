import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductCollectionFindManySchema as ProductCollectionFindManySchema } from '../findManyProductCollection.schema';
import { CollectionCountOutputTypeArgsObjectSchema as CollectionCountOutputTypeArgsObjectSchema } from './CollectionCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  products: z.union([z.boolean(), z.lazy(() => ProductCollectionFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CollectionCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CollectionSelectObjectSchema: z.ZodType<Prisma.CollectionSelect> = makeSchema() as unknown as z.ZodType<Prisma.CollectionSelect>;
export const CollectionSelectObjectZodSchema = makeSchema();
