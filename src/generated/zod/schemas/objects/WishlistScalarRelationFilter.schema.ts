import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistWhereInputObjectSchema as WishlistWhereInputObjectSchema } from './WishlistWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => WishlistWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => WishlistWhereInputObjectSchema).optional()
}).strict();
export const WishlistScalarRelationFilterObjectSchema: z.ZodType<Prisma.WishlistScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.WishlistScalarRelationFilter>;
export const WishlistScalarRelationFilterObjectZodSchema = makeSchema();
