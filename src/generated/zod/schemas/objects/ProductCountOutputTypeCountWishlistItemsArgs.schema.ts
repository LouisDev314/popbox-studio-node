import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistItemWhereInputObjectSchema as WishlistItemWhereInputObjectSchema } from './WishlistItemWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WishlistItemWhereInputObjectSchema).optional()
}).strict();
export const ProductCountOutputTypeCountWishlistItemsArgsObjectSchema = makeSchema();
export const ProductCountOutputTypeCountWishlistItemsArgsObjectZodSchema = makeSchema();
