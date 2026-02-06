import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistItemUpdateManyMutationInputObjectSchema as WishlistItemUpdateManyMutationInputObjectSchema } from './objects/WishlistItemUpdateManyMutationInput.schema';
import { WishlistItemWhereInputObjectSchema as WishlistItemWhereInputObjectSchema } from './objects/WishlistItemWhereInput.schema';

export const WishlistItemUpdateManySchema: z.ZodType<Prisma.WishlistItemUpdateManyArgs> = z.object({ data: WishlistItemUpdateManyMutationInputObjectSchema, where: WishlistItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.WishlistItemUpdateManyArgs>;

export const WishlistItemUpdateManyZodSchema = z.object({ data: WishlistItemUpdateManyMutationInputObjectSchema, where: WishlistItemWhereInputObjectSchema.optional() }).strict();