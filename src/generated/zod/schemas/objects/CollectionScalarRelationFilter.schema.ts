import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CollectionWhereInputObjectSchema as CollectionWhereInputObjectSchema } from './CollectionWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => CollectionWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => CollectionWhereInputObjectSchema).optional()
}).strict();
export const CollectionScalarRelationFilterObjectSchema: z.ZodType<Prisma.CollectionScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CollectionScalarRelationFilter>;
export const CollectionScalarRelationFilterObjectZodSchema = makeSchema();
