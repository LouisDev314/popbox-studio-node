import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistWhereInputObjectSchema as WishlistWhereInputObjectSchema } from './objects/WishlistWhereInput.schema';

export const WishlistDeleteManySchema: z.ZodType<Prisma.WishlistDeleteManyArgs> = z.object({ where: WishlistWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.WishlistDeleteManyArgs>;

export const WishlistDeleteManyZodSchema = z.object({ where: WishlistWhereInputObjectSchema.optional() }).strict();