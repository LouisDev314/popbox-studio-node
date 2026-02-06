import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WishlistItemWhereUniqueInputObjectSchema as WishlistItemWhereUniqueInputObjectSchema } from './WishlistItemWhereUniqueInput.schema';
import { WishlistItemUpdateWithoutProductInputObjectSchema as WishlistItemUpdateWithoutProductInputObjectSchema } from './WishlistItemUpdateWithoutProductInput.schema';
import { WishlistItemUncheckedUpdateWithoutProductInputObjectSchema as WishlistItemUncheckedUpdateWithoutProductInputObjectSchema } from './WishlistItemUncheckedUpdateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WishlistItemWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => WishlistItemUpdateWithoutProductInputObjectSchema), z.lazy(() => WishlistItemUncheckedUpdateWithoutProductInputObjectSchema)])
}).strict();
export const WishlistItemUpdateWithWhereUniqueWithoutProductInputObjectSchema: z.ZodType<Prisma.WishlistItemUpdateWithWhereUniqueWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.WishlistItemUpdateWithWhereUniqueWithoutProductInput>;
export const WishlistItemUpdateWithWhereUniqueWithoutProductInputObjectZodSchema = makeSchema();
