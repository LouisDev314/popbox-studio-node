import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  wishlistId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();
export const WishlistItemUncheckedCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.WishlistItemUncheckedCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemUncheckedCreateWithoutProductInput>;
export const WishlistItemUncheckedCreateWithoutProductInputObjectZodSchema = makeSchema();
