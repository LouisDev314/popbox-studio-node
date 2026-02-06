import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistItemUncheckedCreateNestedManyWithoutWishlistInputObjectSchema as WishlistItemUncheckedCreateNestedManyWithoutWishlistInputObjectSchema } from './WishlistItemUncheckedCreateNestedManyWithoutWishlistInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  items: z.lazy(() => WishlistItemUncheckedCreateNestedManyWithoutWishlistInputObjectSchema).optional()
}).strict();
export const WishlistUncheckedCreateInputObjectSchema: z.ZodType<Prisma.WishlistUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistUncheckedCreateInput>;
export const WishlistUncheckedCreateInputObjectZodSchema = makeSchema();
