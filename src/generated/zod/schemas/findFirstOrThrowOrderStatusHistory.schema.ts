import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderStatusHistoryIncludeObjectSchema as OrderStatusHistoryIncludeObjectSchema } from './objects/OrderStatusHistoryInclude.schema';
import { OrderStatusHistoryOrderByWithRelationInputObjectSchema as OrderStatusHistoryOrderByWithRelationInputObjectSchema } from './objects/OrderStatusHistoryOrderByWithRelationInput.schema';
import { OrderStatusHistoryWhereInputObjectSchema as OrderStatusHistoryWhereInputObjectSchema } from './objects/OrderStatusHistoryWhereInput.schema';
import { OrderStatusHistoryWhereUniqueInputObjectSchema as OrderStatusHistoryWhereUniqueInputObjectSchema } from './objects/OrderStatusHistoryWhereUniqueInput.schema';
import { OrderStatusHistoryScalarFieldEnumSchema } from './enums/OrderStatusHistoryScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const OrderStatusHistoryFindFirstOrThrowSelectSchema: z.ZodType<Prisma.OrderStatusHistorySelect> = z.object({
    id: z.boolean().optional(),
    orderId: z.boolean().optional(),
    fromStatus: z.boolean().optional(),
    toStatus: z.boolean().optional(),
    reason: z.boolean().optional(),
    changedBy: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    order: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.OrderStatusHistorySelect>;

export const OrderStatusHistoryFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    orderId: z.boolean().optional(),
    fromStatus: z.boolean().optional(),
    toStatus: z.boolean().optional(),
    reason: z.boolean().optional(),
    changedBy: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    order: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict();

export const OrderStatusHistoryFindFirstOrThrowSchema: z.ZodType<Prisma.OrderStatusHistoryFindFirstOrThrowArgs> = z.object({ select: OrderStatusHistoryFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => OrderStatusHistoryIncludeObjectSchema.optional()), orderBy: z.union([OrderStatusHistoryOrderByWithRelationInputObjectSchema, OrderStatusHistoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: OrderStatusHistoryWhereInputObjectSchema.optional(), cursor: OrderStatusHistoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OrderStatusHistoryScalarFieldEnumSchema, OrderStatusHistoryScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.OrderStatusHistoryFindFirstOrThrowArgs>;

export const OrderStatusHistoryFindFirstOrThrowZodSchema = z.object({ select: OrderStatusHistoryFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => OrderStatusHistoryIncludeObjectSchema.optional()), orderBy: z.union([OrderStatusHistoryOrderByWithRelationInputObjectSchema, OrderStatusHistoryOrderByWithRelationInputObjectSchema.array()]).optional(), where: OrderStatusHistoryWhereInputObjectSchema.optional(), cursor: OrderStatusHistoryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OrderStatusHistoryScalarFieldEnumSchema, OrderStatusHistoryScalarFieldEnumSchema.array()]).optional() }).strict();