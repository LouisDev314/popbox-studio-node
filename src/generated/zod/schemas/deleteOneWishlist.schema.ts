import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistSelectObjectSchema as WishlistSelectObjectSchema } from './objects/WishlistSelect.schema';
import { WishlistIncludeObjectSchema as WishlistIncludeObjectSchema } from './objects/WishlistInclude.schema';
import { WishlistWhereUniqueInputObjectSchema as WishlistWhereUniqueInputObjectSchema } from './objects/WishlistWhereUniqueInput.schema';

export const WishlistDeleteOneSchema: z.ZodType<Prisma.WishlistDeleteArgs> = z.object({ select: WishlistSelectObjectSchema.optional(), include: WishlistIncludeObjectSchema.optional(), where: WishlistWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.WishlistDeleteArgs>;

export const WishlistDeleteOneZodSchema = z.object({ select: WishlistSelectObjectSchema.optional(), include: WishlistIncludeObjectSchema.optional(), where: WishlistWhereUniqueInputObjectSchema }).strict();