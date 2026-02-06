import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistItemSelectObjectSchema as WishlistItemSelectObjectSchema } from './objects/WishlistItemSelect.schema';
import { WishlistItemIncludeObjectSchema as WishlistItemIncludeObjectSchema } from './objects/WishlistItemInclude.schema';
import { WishlistItemWhereUniqueInputObjectSchema as WishlistItemWhereUniqueInputObjectSchema } from './objects/WishlistItemWhereUniqueInput.schema';

export const WishlistItemFindUniqueSchema: z.ZodType<Prisma.WishlistItemFindUniqueArgs> = z.object({ select: WishlistItemSelectObjectSchema.optional(), include: WishlistItemIncludeObjectSchema.optional(), where: WishlistItemWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.WishlistItemFindUniqueArgs>;

export const WishlistItemFindUniqueZodSchema = z.object({ select: WishlistItemSelectObjectSchema.optional(), include: WishlistItemIncludeObjectSchema.optional(), where: WishlistItemWhereUniqueInputObjectSchema }).strict();