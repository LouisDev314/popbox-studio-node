import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistCreateManyInputObjectSchema as WishlistCreateManyInputObjectSchema } from './objects/WishlistCreateManyInput.schema';

export const WishlistCreateManySchema: z.ZodType<Prisma.WishlistCreateManyArgs> = z.object({ data: z.union([ WishlistCreateManyInputObjectSchema, z.array(WishlistCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.WishlistCreateManyArgs>;

export const WishlistCreateManyZodSchema = z.object({ data: z.union([ WishlistCreateManyInputObjectSchema, z.array(WishlistCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();