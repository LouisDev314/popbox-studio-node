import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistItemOrderByWithRelationInputObjectSchema as WishlistItemOrderByWithRelationInputObjectSchema } from './objects/WishlistItemOrderByWithRelationInput.schema';
import { WishlistItemWhereInputObjectSchema as WishlistItemWhereInputObjectSchema } from './objects/WishlistItemWhereInput.schema';
import { WishlistItemWhereUniqueInputObjectSchema as WishlistItemWhereUniqueInputObjectSchema } from './objects/WishlistItemWhereUniqueInput.schema';
import { WishlistItemCountAggregateInputObjectSchema as WishlistItemCountAggregateInputObjectSchema } from './objects/WishlistItemCountAggregateInput.schema';

export const WishlistItemCountSchema: z.ZodType<Prisma.WishlistItemCountArgs> = z.object({ orderBy: z.union([WishlistItemOrderByWithRelationInputObjectSchema, WishlistItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: WishlistItemWhereInputObjectSchema.optional(), cursor: WishlistItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), WishlistItemCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.WishlistItemCountArgs>;

export const WishlistItemCountZodSchema = z.object({ orderBy: z.union([WishlistItemOrderByWithRelationInputObjectSchema, WishlistItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: WishlistItemWhereInputObjectSchema.optional(), cursor: WishlistItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), WishlistItemCountAggregateInputObjectSchema ]).optional() }).strict();