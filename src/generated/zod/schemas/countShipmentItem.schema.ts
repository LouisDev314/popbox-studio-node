import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ShipmentItemOrderByWithRelationInputObjectSchema as ShipmentItemOrderByWithRelationInputObjectSchema } from './objects/ShipmentItemOrderByWithRelationInput.schema';
import { ShipmentItemWhereInputObjectSchema as ShipmentItemWhereInputObjectSchema } from './objects/ShipmentItemWhereInput.schema';
import { ShipmentItemWhereUniqueInputObjectSchema as ShipmentItemWhereUniqueInputObjectSchema } from './objects/ShipmentItemWhereUniqueInput.schema';
import { ShipmentItemCountAggregateInputObjectSchema as ShipmentItemCountAggregateInputObjectSchema } from './objects/ShipmentItemCountAggregateInput.schema';

export const ShipmentItemCountSchema: z.ZodType<Prisma.ShipmentItemCountArgs> = z.object({ orderBy: z.union([ShipmentItemOrderByWithRelationInputObjectSchema, ShipmentItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: ShipmentItemWhereInputObjectSchema.optional(), cursor: ShipmentItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ShipmentItemCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ShipmentItemCountArgs>;

export const ShipmentItemCountZodSchema = z.object({ orderBy: z.union([ShipmentItemOrderByWithRelationInputObjectSchema, ShipmentItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: ShipmentItemWhereInputObjectSchema.optional(), cursor: ShipmentItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ShipmentItemCountAggregateInputObjectSchema ]).optional() }).strict();