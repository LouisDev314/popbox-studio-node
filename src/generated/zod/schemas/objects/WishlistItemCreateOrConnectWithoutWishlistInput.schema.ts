import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistItemWhereUniqueInputObjectSchema as WishlistItemWhereUniqueInputObjectSchema } from './WishlistItemWhereUniqueInput.schema';
import { WishlistItemCreateWithoutWishlistInputObjectSchema as WishlistItemCreateWithoutWishlistInputObjectSchema } from './WishlistItemCreateWithoutWishlistInput.schema';
import { WishlistItemUncheckedCreateWithoutWishlistInputObjectSchema as WishlistItemUncheckedCreateWithoutWishlistInputObjectSchema } from './WishlistItemUncheckedCreateWithoutWishlistInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WishlistItemWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => WishlistItemCreateWithoutWishlistInputObjectSchema), z.lazy(() => WishlistItemUncheckedCreateWithoutWishlistInputObjectSchema)])
}).strict();
export const WishlistItemCreateOrConnectWithoutWishlistInputObjectSchema: z.ZodType<Prisma.WishlistItemCreateOrConnectWithoutWishlistInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemCreateOrConnectWithoutWishlistInput>;
export const WishlistItemCreateOrConnectWithoutWishlistInputObjectZodSchema = makeSchema();
