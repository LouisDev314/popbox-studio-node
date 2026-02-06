import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  wishlistId: z.string(),
  productId: z.string()
}).strict();
export const WishlistItemWishlistIdProductIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.WishlistItemWishlistIdProductIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemWishlistIdProductIdCompoundUniqueInput>;
export const WishlistItemWishlistIdProductIdCompoundUniqueInputObjectZodSchema = makeSchema();
