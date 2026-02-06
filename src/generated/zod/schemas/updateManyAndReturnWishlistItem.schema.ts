import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistItemSelectObjectSchema as WishlistItemSelectObjectSchema } from './objects/WishlistItemSelect.schema';
import { WishlistItemUpdateManyMutationInputObjectSchema as WishlistItemUpdateManyMutationInputObjectSchema } from './objects/WishlistItemUpdateManyMutationInput.schema';
import { WishlistItemWhereInputObjectSchema as WishlistItemWhereInputObjectSchema } from './objects/WishlistItemWhereInput.schema';

export const WishlistItemUpdateManyAndReturnSchema: z.ZodType<Prisma.WishlistItemUpdateManyAndReturnArgs> = z.object({ select: WishlistItemSelectObjectSchema.optional(), data: WishlistItemUpdateManyMutationInputObjectSchema, where: WishlistItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.WishlistItemUpdateManyAndReturnArgs>;

export const WishlistItemUpdateManyAndReturnZodSchema = z.object({ select: WishlistItemSelectObjectSchema.optional(), data: WishlistItemUpdateManyMutationInputObjectSchema, where: WishlistItemWhereInputObjectSchema.optional() }).strict();