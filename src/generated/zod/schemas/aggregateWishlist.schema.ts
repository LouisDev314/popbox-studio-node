import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistOrderByWithRelationInputObjectSchema as WishlistOrderByWithRelationInputObjectSchema } from './objects/WishlistOrderByWithRelationInput.schema';
import { WishlistWhereInputObjectSchema as WishlistWhereInputObjectSchema } from './objects/WishlistWhereInput.schema';
import { WishlistWhereUniqueInputObjectSchema as WishlistWhereUniqueInputObjectSchema } from './objects/WishlistWhereUniqueInput.schema';
import { WishlistCountAggregateInputObjectSchema as WishlistCountAggregateInputObjectSchema } from './objects/WishlistCountAggregateInput.schema';
import { WishlistMinAggregateInputObjectSchema as WishlistMinAggregateInputObjectSchema } from './objects/WishlistMinAggregateInput.schema';
import { WishlistMaxAggregateInputObjectSchema as WishlistMaxAggregateInputObjectSchema } from './objects/WishlistMaxAggregateInput.schema';

export const WishlistAggregateSchema: z.ZodType<Prisma.WishlistAggregateArgs> = z.object({ orderBy: z.union([WishlistOrderByWithRelationInputObjectSchema, WishlistOrderByWithRelationInputObjectSchema.array()]).optional(), where: WishlistWhereInputObjectSchema.optional(), cursor: WishlistWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), WishlistCountAggregateInputObjectSchema ]).optional(), _min: WishlistMinAggregateInputObjectSchema.optional(), _max: WishlistMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.WishlistAggregateArgs>;

export const WishlistAggregateZodSchema = z.object({ orderBy: z.union([WishlistOrderByWithRelationInputObjectSchema, WishlistOrderByWithRelationInputObjectSchema.array()]).optional(), where: WishlistWhereInputObjectSchema.optional(), cursor: WishlistWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), WishlistCountAggregateInputObjectSchema ]).optional(), _min: WishlistMinAggregateInputObjectSchema.optional(), _max: WishlistMaxAggregateInputObjectSchema.optional() }).strict();