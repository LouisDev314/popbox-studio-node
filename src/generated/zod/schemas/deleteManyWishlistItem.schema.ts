import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistItemWhereInputObjectSchema as WishlistItemWhereInputObjectSchema } from './objects/WishlistItemWhereInput.schema';

export const WishlistItemDeleteManySchema: z.ZodType<Prisma.WishlistItemDeleteManyArgs> = z.object({ where: WishlistItemWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.WishlistItemDeleteManyArgs>;

export const WishlistItemDeleteManyZodSchema = z.object({ where: WishlistItemWhereInputObjectSchema.optional() }).strict();