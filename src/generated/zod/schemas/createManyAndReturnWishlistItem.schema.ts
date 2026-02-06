import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistItemSelectObjectSchema as WishlistItemSelectObjectSchema } from './objects/WishlistItemSelect.schema';
import { WishlistItemCreateManyInputObjectSchema as WishlistItemCreateManyInputObjectSchema } from './objects/WishlistItemCreateManyInput.schema';

export const WishlistItemCreateManyAndReturnSchema: z.ZodType<Prisma.WishlistItemCreateManyAndReturnArgs> = z.object({ select: WishlistItemSelectObjectSchema.optional(), data: z.union([ WishlistItemCreateManyInputObjectSchema, z.array(WishlistItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.WishlistItemCreateManyAndReturnArgs>;

export const WishlistItemCreateManyAndReturnZodSchema = z.object({ select: WishlistItemSelectObjectSchema.optional(), data: z.union([ WishlistItemCreateManyInputObjectSchema, z.array(WishlistItemCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();