import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  wishlistId: z.string(),
  productId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();
export const WishlistItemUncheckedCreateInputObjectSchema: z.ZodType<Prisma.WishlistItemUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemUncheckedCreateInput>;
export const WishlistItemUncheckedCreateInputObjectZodSchema = makeSchema();
