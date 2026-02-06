import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistOrderByWithRelationInputObjectSchema as WishlistOrderByWithRelationInputObjectSchema } from './objects/WishlistOrderByWithRelationInput.schema';
import { WishlistWhereInputObjectSchema as WishlistWhereInputObjectSchema } from './objects/WishlistWhereInput.schema';
import { WishlistWhereUniqueInputObjectSchema as WishlistWhereUniqueInputObjectSchema } from './objects/WishlistWhereUniqueInput.schema';
import { WishlistCountAggregateInputObjectSchema as WishlistCountAggregateInputObjectSchema } from './objects/WishlistCountAggregateInput.schema';

export const WishlistCountSchema: z.ZodType<Prisma.WishlistCountArgs> = z.object({ orderBy: z.union([WishlistOrderByWithRelationInputObjectSchema, WishlistOrderByWithRelationInputObjectSchema.array()]).optional(), where: WishlistWhereInputObjectSchema.optional(), cursor: WishlistWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), WishlistCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.WishlistCountArgs>;

export const WishlistCountZodSchema = z.object({ orderBy: z.union([WishlistOrderByWithRelationInputObjectSchema, WishlistOrderByWithRelationInputObjectSchema.array()]).optional(), where: WishlistWhereInputObjectSchema.optional(), cursor: WishlistWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), WishlistCountAggregateInputObjectSchema ]).optional() }).strict();