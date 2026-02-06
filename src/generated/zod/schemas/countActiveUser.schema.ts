import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActiveUserOrderByWithRelationInputObjectSchema as ActiveUserOrderByWithRelationInputObjectSchema } from './objects/ActiveUserOrderByWithRelationInput.schema';
import { ActiveUserWhereInputObjectSchema as ActiveUserWhereInputObjectSchema } from './objects/ActiveUserWhereInput.schema';
import { ActiveUserWhereUniqueInputObjectSchema as ActiveUserWhereUniqueInputObjectSchema } from './objects/ActiveUserWhereUniqueInput.schema';
import { ActiveUserCountAggregateInputObjectSchema as ActiveUserCountAggregateInputObjectSchema } from './objects/ActiveUserCountAggregateInput.schema';

export const ActiveUserCountSchema: z.ZodType<Prisma.ActiveUserCountArgs> = z.object({ orderBy: z.union([ActiveUserOrderByWithRelationInputObjectSchema, ActiveUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: ActiveUserWhereInputObjectSchema.optional(), cursor: ActiveUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ActiveUserCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ActiveUserCountArgs>;

export const ActiveUserCountZodSchema = z.object({ orderBy: z.union([ActiveUserOrderByWithRelationInputObjectSchema, ActiveUserOrderByWithRelationInputObjectSchema.array()]).optional(), where: ActiveUserWhereInputObjectSchema.optional(), cursor: ActiveUserWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ActiveUserCountAggregateInputObjectSchema ]).optional() }).strict();