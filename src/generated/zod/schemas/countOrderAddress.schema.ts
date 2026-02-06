import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderAddressOrderByWithRelationInputObjectSchema as OrderAddressOrderByWithRelationInputObjectSchema } from './objects/OrderAddressOrderByWithRelationInput.schema';
import { OrderAddressWhereInputObjectSchema as OrderAddressWhereInputObjectSchema } from './objects/OrderAddressWhereInput.schema';
import { OrderAddressWhereUniqueInputObjectSchema as OrderAddressWhereUniqueInputObjectSchema } from './objects/OrderAddressWhereUniqueInput.schema';
import { OrderAddressCountAggregateInputObjectSchema as OrderAddressCountAggregateInputObjectSchema } from './objects/OrderAddressCountAggregateInput.schema';

export const OrderAddressCountSchema: z.ZodType<Prisma.OrderAddressCountArgs> = z.object({ orderBy: z.union([OrderAddressOrderByWithRelationInputObjectSchema, OrderAddressOrderByWithRelationInputObjectSchema.array()]).optional(), where: OrderAddressWhereInputObjectSchema.optional(), cursor: OrderAddressWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), OrderAddressCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.OrderAddressCountArgs>;

export const OrderAddressCountZodSchema = z.object({ orderBy: z.union([OrderAddressOrderByWithRelationInputObjectSchema, OrderAddressOrderByWithRelationInputObjectSchema.array()]).optional(), where: OrderAddressWhereInputObjectSchema.optional(), cursor: OrderAddressWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), OrderAddressCountAggregateInputObjectSchema ]).optional() }).strict();