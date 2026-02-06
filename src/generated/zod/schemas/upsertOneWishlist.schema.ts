import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistSelectObjectSchema as WishlistSelectObjectSchema } from './objects/WishlistSelect.schema';
import { WishlistIncludeObjectSchema as WishlistIncludeObjectSchema } from './objects/WishlistInclude.schema';
import { WishlistWhereUniqueInputObjectSchema as WishlistWhereUniqueInputObjectSchema } from './objects/WishlistWhereUniqueInput.schema';
import { WishlistCreateInputObjectSchema as WishlistCreateInputObjectSchema } from './objects/WishlistCreateInput.schema';
import { WishlistUncheckedCreateInputObjectSchema as WishlistUncheckedCreateInputObjectSchema } from './objects/WishlistUncheckedCreateInput.schema';
import { WishlistUpdateInputObjectSchema as WishlistUpdateInputObjectSchema } from './objects/WishlistUpdateInput.schema';
import { WishlistUncheckedUpdateInputObjectSchema as WishlistUncheckedUpdateInputObjectSchema } from './objects/WishlistUncheckedUpdateInput.schema';

export const WishlistUpsertOneSchema: z.ZodType<Prisma.WishlistUpsertArgs> = z.object({ select: WishlistSelectObjectSchema.optional(), include: WishlistIncludeObjectSchema.optional(), where: WishlistWhereUniqueInputObjectSchema, create: z.union([ WishlistCreateInputObjectSchema, WishlistUncheckedCreateInputObjectSchema ]), update: z.union([ WishlistUpdateInputObjectSchema, WishlistUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.WishlistUpsertArgs>;

export const WishlistUpsertOneZodSchema = z.object({ select: WishlistSelectObjectSchema.optional(), include: WishlistIncludeObjectSchema.optional(), where: WishlistWhereUniqueInputObjectSchema, create: z.union([ WishlistCreateInputObjectSchema, WishlistUncheckedCreateInputObjectSchema ]), update: z.union([ WishlistUpdateInputObjectSchema, WishlistUncheckedUpdateInputObjectSchema ]) }).strict();