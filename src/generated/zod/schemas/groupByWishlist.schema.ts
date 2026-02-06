import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistWhereInputObjectSchema as WishlistWhereInputObjectSchema } from './objects/WishlistWhereInput.schema';
import { WishlistOrderByWithAggregationInputObjectSchema as WishlistOrderByWithAggregationInputObjectSchema } from './objects/WishlistOrderByWithAggregationInput.schema';
import { WishlistScalarWhereWithAggregatesInputObjectSchema as WishlistScalarWhereWithAggregatesInputObjectSchema } from './objects/WishlistScalarWhereWithAggregatesInput.schema';
import { WishlistScalarFieldEnumSchema } from './enums/WishlistScalarFieldEnum.schema';
import { WishlistCountAggregateInputObjectSchema as WishlistCountAggregateInputObjectSchema } from './objects/WishlistCountAggregateInput.schema';
import { WishlistMinAggregateInputObjectSchema as WishlistMinAggregateInputObjectSchema } from './objects/WishlistMinAggregateInput.schema';
import { WishlistMaxAggregateInputObjectSchema as WishlistMaxAggregateInputObjectSchema } from './objects/WishlistMaxAggregateInput.schema';

export const WishlistGroupBySchema: z.ZodType<Prisma.WishlistGroupByArgs> = z.object({ where: WishlistWhereInputObjectSchema.optional(), orderBy: z.union([WishlistOrderByWithAggregationInputObjectSchema, WishlistOrderByWithAggregationInputObjectSchema.array()]).optional(), having: WishlistScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(WishlistScalarFieldEnumSchema), _count: z.union([ z.literal(true), WishlistCountAggregateInputObjectSchema ]).optional(), _min: WishlistMinAggregateInputObjectSchema.optional(), _max: WishlistMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.WishlistGroupByArgs>;

export const WishlistGroupByZodSchema = z.object({ where: WishlistWhereInputObjectSchema.optional(), orderBy: z.union([WishlistOrderByWithAggregationInputObjectSchema, WishlistOrderByWithAggregationInputObjectSchema.array()]).optional(), having: WishlistScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(WishlistScalarFieldEnumSchema), _count: z.union([ z.literal(true), WishlistCountAggregateInputObjectSchema ]).optional(), _min: WishlistMinAggregateInputObjectSchema.optional(), _max: WishlistMaxAggregateInputObjectSchema.optional() }).strict();