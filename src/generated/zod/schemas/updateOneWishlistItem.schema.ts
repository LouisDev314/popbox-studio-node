import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistItemSelectObjectSchema as WishlistItemSelectObjectSchema } from './objects/WishlistItemSelect.schema';
import { WishlistItemIncludeObjectSchema as WishlistItemIncludeObjectSchema } from './objects/WishlistItemInclude.schema';
import { WishlistItemUpdateInputObjectSchema as WishlistItemUpdateInputObjectSchema } from './objects/WishlistItemUpdateInput.schema';
import { WishlistItemUncheckedUpdateInputObjectSchema as WishlistItemUncheckedUpdateInputObjectSchema } from './objects/WishlistItemUncheckedUpdateInput.schema';
import { WishlistItemWhereUniqueInputObjectSchema as WishlistItemWhereUniqueInputObjectSchema } from './objects/WishlistItemWhereUniqueInput.schema';

export const WishlistItemUpdateOneSchema: z.ZodType<Prisma.WishlistItemUpdateArgs> = z.object({ select: WishlistItemSelectObjectSchema.optional(), include: WishlistItemIncludeObjectSchema.optional(), data: z.union([WishlistItemUpdateInputObjectSchema, WishlistItemUncheckedUpdateInputObjectSchema]), where: WishlistItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.WishlistItemUpdateArgs>;

export const WishlistItemUpdateOneZodSchema = z.object({ select: WishlistItemSelectObjectSchema.optional(), include: WishlistItemIncludeObjectSchema.optional(), data: z.union([WishlistItemUpdateInputObjectSchema, WishlistItemUncheckedUpdateInputObjectSchema]), where: WishlistItemWhereUniqueInputObjectSchema }).strict();