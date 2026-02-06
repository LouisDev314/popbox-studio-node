import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistSelectObjectSchema as WishlistSelectObjectSchema } from './objects/WishlistSelect.schema';
import { WishlistCreateManyInputObjectSchema as WishlistCreateManyInputObjectSchema } from './objects/WishlistCreateManyInput.schema';

export const WishlistCreateManyAndReturnSchema: z.ZodType<Prisma.WishlistCreateManyAndReturnArgs> = z.object({ select: WishlistSelectObjectSchema.optional(), data: z.union([ WishlistCreateManyInputObjectSchema, z.array(WishlistCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.WishlistCreateManyAndReturnArgs>;

export const WishlistCreateManyAndReturnZodSchema = z.object({ select: WishlistSelectObjectSchema.optional(), data: z.union([ WishlistCreateManyInputObjectSchema, z.array(WishlistCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();