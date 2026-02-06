import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistItemWhereUniqueInputObjectSchema as WishlistItemWhereUniqueInputObjectSchema } from './WishlistItemWhereUniqueInput.schema';
import { WishlistItemUpdateWithoutWishlistInputObjectSchema as WishlistItemUpdateWithoutWishlistInputObjectSchema } from './WishlistItemUpdateWithoutWishlistInput.schema';
import { WishlistItemUncheckedUpdateWithoutWishlistInputObjectSchema as WishlistItemUncheckedUpdateWithoutWishlistInputObjectSchema } from './WishlistItemUncheckedUpdateWithoutWishlistInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WishlistItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => WishlistItemUpdateWithoutWishlistInputObjectSchema), z.lazy(() => WishlistItemUncheckedUpdateWithoutWishlistInputObjectSchema)])
}).strict();
export const WishlistItemUpdateWithWhereUniqueWithoutWishlistInputObjectSchema: z.ZodType<Prisma.WishlistItemUpdateWithWhereUniqueWithoutWishlistInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemUpdateWithWhereUniqueWithoutWishlistInput>;
export const WishlistItemUpdateWithWhereUniqueWithoutWishlistInputObjectZodSchema = makeSchema();
