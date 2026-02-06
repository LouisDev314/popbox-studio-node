import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CollectionOrderByWithRelationInputObjectSchema as CollectionOrderByWithRelationInputObjectSchema } from './objects/CollectionOrderByWithRelationInput.schema';
import { CollectionWhereInputObjectSchema as CollectionWhereInputObjectSchema } from './objects/CollectionWhereInput.schema';
import { CollectionWhereUniqueInputObjectSchema as CollectionWhereUniqueInputObjectSchema } from './objects/CollectionWhereUniqueInput.schema';
import { CollectionCountAggregateInputObjectSchema as CollectionCountAggregateInputObjectSchema } from './objects/CollectionCountAggregateInput.schema';

export const CollectionCountSchema: z.ZodType<Prisma.CollectionCountArgs> = z.object({ orderBy: z.union([CollectionOrderByWithRelationInputObjectSchema, CollectionOrderByWithRelationInputObjectSchema.array()]).optional(), where: CollectionWhereInputObjectSchema.optional(), cursor: CollectionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CollectionCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.CollectionCountArgs>;

export const CollectionCountZodSchema = z.object({ orderBy: z.union([CollectionOrderByWithRelationInputObjectSchema, CollectionOrderByWithRelationInputObjectSchema.array()]).optional(), where: CollectionWhereInputObjectSchema.optional(), cursor: CollectionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), CollectionCountAggregateInputObjectSchema ]).optional() }).strict();