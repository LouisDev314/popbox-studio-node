import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CollectionCountOutputTypeSelectObjectSchema as CollectionCountOutputTypeSelectObjectSchema } from './CollectionCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CollectionCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const CollectionCountOutputTypeArgsObjectSchema = makeSchema();
export const CollectionCountOutputTypeArgsObjectZodSchema = makeSchema();
