import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistItemWhereInputObjectSchema as WishlistItemWhereInputObjectSchema } from './WishlistItemWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => WishlistItemWhereInputObjectSchema).optional(),
  some: z.lazy(() => WishlistItemWhereInputObjectSchema).optional(),
  none: z.lazy(() => WishlistItemWhereInputObjectSchema).optional()
}).strict();
export const WishlistItemListRelationFilterObjectSchema: z.ZodType<Prisma.WishlistItemListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemListRelationFilter>;
export const WishlistItemListRelationFilterObjectZodSchema = makeSchema();
