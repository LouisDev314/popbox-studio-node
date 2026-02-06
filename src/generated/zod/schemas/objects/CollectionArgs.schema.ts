import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CollectionSelectObjectSchema as CollectionSelectObjectSchema } from './CollectionSelect.schema';
import { CollectionIncludeObjectSchema as CollectionIncludeObjectSchema } from './CollectionInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CollectionSelectObjectSchema).optional(),
  include: z.lazy(() => CollectionIncludeObjectSchema).optional()
}).strict();
export const CollectionArgsObjectSchema = makeSchema();
export const CollectionArgsObjectZodSchema = makeSchema();
