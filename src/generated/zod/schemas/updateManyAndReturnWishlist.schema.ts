import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistSelectObjectSchema as WishlistSelectObjectSchema } from './objects/WishlistSelect.schema';
import { WishlistUpdateManyMutationInputObjectSchema as WishlistUpdateManyMutationInputObjectSchema } from './objects/WishlistUpdateManyMutationInput.schema';
import { WishlistWhereInputObjectSchema as WishlistWhereInputObjectSchema } from './objects/WishlistWhereInput.schema';

export const WishlistUpdateManyAndReturnSchema: z.ZodType<Prisma.WishlistUpdateManyAndReturnArgs> = z.object({ select: WishlistSelectObjectSchema.optional(), data: WishlistUpdateManyMutationInputObjectSchema, where: WishlistWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.WishlistUpdateManyAndReturnArgs>;

export const WishlistUpdateManyAndReturnZodSchema = z.object({ select: WishlistSelectObjectSchema.optional(), data: WishlistUpdateManyMutationInputObjectSchema, where: WishlistWhereInputObjectSchema.optional() }).strict();