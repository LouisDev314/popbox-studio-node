import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistWhereInputObjectSchema as WishlistWhereInputObjectSchema } from './WishlistWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => WishlistWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => WishlistWhereInputObjectSchema).optional().nullable()
}).strict();
export const WishlistNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.WishlistNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.WishlistNullableScalarRelationFilter>;
export const WishlistNullableScalarRelationFilterObjectZodSchema = makeSchema();
