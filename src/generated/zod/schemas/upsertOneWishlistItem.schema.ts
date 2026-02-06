import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistItemSelectObjectSchema as WishlistItemSelectObjectSchema } from './objects/WishlistItemSelect.schema';
import { WishlistItemIncludeObjectSchema as WishlistItemIncludeObjectSchema } from './objects/WishlistItemInclude.schema';
import { WishlistItemWhereUniqueInputObjectSchema as WishlistItemWhereUniqueInputObjectSchema } from './objects/WishlistItemWhereUniqueInput.schema';
import { WishlistItemCreateInputObjectSchema as WishlistItemCreateInputObjectSchema } from './objects/WishlistItemCreateInput.schema';
import { WishlistItemUncheckedCreateInputObjectSchema as WishlistItemUncheckedCreateInputObjectSchema } from './objects/WishlistItemUncheckedCreateInput.schema';
import { WishlistItemUpdateInputObjectSchema as WishlistItemUpdateInputObjectSchema } from './objects/WishlistItemUpdateInput.schema';
import { WishlistItemUncheckedUpdateInputObjectSchema as WishlistItemUncheckedUpdateInputObjectSchema } from './objects/WishlistItemUncheckedUpdateInput.schema';

export const WishlistItemUpsertOneSchema: z.ZodType<Prisma.WishlistItemUpsertArgs> = z.object({ select: WishlistItemSelectObjectSchema.optional(), include: WishlistItemIncludeObjectSchema.optional(), where: WishlistItemWhereUniqueInputObjectSchema, create: z.union([ WishlistItemCreateInputObjectSchema, WishlistItemUncheckedCreateInputObjectSchema ]), update: z.union([ WishlistItemUpdateInputObjectSchema, WishlistItemUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.WishlistItemUpsertArgs>;

export const WishlistItemUpsertOneZodSchema = z.object({ select: WishlistItemSelectObjectSchema.optional(), include: WishlistItemIncludeObjectSchema.optional(), where: WishlistItemWhereUniqueInputObjectSchema, create: z.union([ WishlistItemCreateInputObjectSchema, WishlistItemUncheckedCreateInputObjectSchema ]), update: z.union([ WishlistItemUpdateInputObjectSchema, WishlistItemUncheckedUpdateInputObjectSchema ]) }).strict();