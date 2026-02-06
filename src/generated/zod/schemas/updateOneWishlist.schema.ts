import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistSelectObjectSchema as WishlistSelectObjectSchema } from './objects/WishlistSelect.schema';
import { WishlistIncludeObjectSchema as WishlistIncludeObjectSchema } from './objects/WishlistInclude.schema';
import { WishlistUpdateInputObjectSchema as WishlistUpdateInputObjectSchema } from './objects/WishlistUpdateInput.schema';
import { WishlistUncheckedUpdateInputObjectSchema as WishlistUncheckedUpdateInputObjectSchema } from './objects/WishlistUncheckedUpdateInput.schema';
import { WishlistWhereUniqueInputObjectSchema as WishlistWhereUniqueInputObjectSchema } from './objects/WishlistWhereUniqueInput.schema';

export const WishlistUpdateOneSchema: z.ZodType<Prisma.WishlistUpdateArgs> = z.object({ select: WishlistSelectObjectSchema.optional(), include: WishlistIncludeObjectSchema.optional(), data: z.union([WishlistUpdateInputObjectSchema, WishlistUncheckedUpdateInputObjectSchema]), where: WishlistWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.WishlistUpdateArgs>;

export const WishlistUpdateOneZodSchema = z.object({ select: WishlistSelectObjectSchema.optional(), include: WishlistIncludeObjectSchema.optional(), data: z.union([WishlistUpdateInputObjectSchema, WishlistUncheckedUpdateInputObjectSchema]), where: WishlistWhereUniqueInputObjectSchema }).strict();