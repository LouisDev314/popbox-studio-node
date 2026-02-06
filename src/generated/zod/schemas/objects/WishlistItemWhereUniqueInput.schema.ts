import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistItemWishlistIdProductIdCompoundUniqueInputObjectSchema as WishlistItemWishlistIdProductIdCompoundUniqueInputObjectSchema } from './WishlistItemWishlistIdProductIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  wishlistId_productId: z.lazy(() => WishlistItemWishlistIdProductIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const WishlistItemWhereUniqueInputObjectSchema: z.ZodType<Prisma.WishlistItemWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemWhereUniqueInput>;
export const WishlistItemWhereUniqueInputObjectZodSchema = makeSchema();
