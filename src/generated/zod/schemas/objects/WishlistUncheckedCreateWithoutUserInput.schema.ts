import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistItemUncheckedCreateNestedManyWithoutWishlistInputObjectSchema as WishlistItemUncheckedCreateNestedManyWithoutWishlistInputObjectSchema } from './WishlistItemUncheckedCreateNestedManyWithoutWishlistInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  items: z.lazy(() => WishlistItemUncheckedCreateNestedManyWithoutWishlistInputObjectSchema).optional()
}).strict();
export const WishlistUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.WishlistUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistUncheckedCreateWithoutUserInput>;
export const WishlistUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
