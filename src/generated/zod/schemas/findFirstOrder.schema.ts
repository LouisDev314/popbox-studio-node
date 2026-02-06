import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderIncludeObjectSchema as OrderIncludeObjectSchema } from './objects/OrderInclude.schema';
import { OrderOrderByWithRelationInputObjectSchema as OrderOrderByWithRelationInputObjectSchema } from './objects/OrderOrderByWithRelationInput.schema';
import { OrderWhereInputObjectSchema as OrderWhereInputObjectSchema } from './objects/OrderWhereInput.schema';
import { OrderWhereUniqueInputObjectSchema as OrderWhereUniqueInputObjectSchema } from './objects/OrderWhereUniqueInput.schema';
import { OrderScalarFieldEnumSchema } from './enums/OrderScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const OrderFindFirstSelectSchema: z.ZodType<Prisma.OrderSelect> = z.object({
    id: z.boolean().optional(),
    orderNumber: z.boolean().optional(),
    userId: z.boolean().optional(),
    status: z.boolean().optional(),
    subtotalAmount: z.boolean().optional(),
    taxAmount: z.boolean().optional(),
    shippingAmount: z.boolean().optional(),
    discountAmount: z.boolean().optional(),
    totalAmount: z.boolean().optional(),
    currency: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.boolean().optional(),
    items: z.boolean().optional(),
    addresses: z.boolean().optional(),
    payments: z.boolean().optional(),
    shipments: z.boolean().optional(),
    statusHistory: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.OrderSelect>;

export const OrderFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    orderNumber: z.boolean().optional(),
    userId: z.boolean().optional(),
    status: z.boolean().optional(),
    subtotalAmount: z.boolean().optional(),
    taxAmount: z.boolean().optional(),
    shippingAmount: z.boolean().optional(),
    discountAmount: z.boolean().optional(),
    totalAmount: z.boolean().optional(),
    currency: z.boolean().optional(),
    metadata: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.boolean().optional(),
    items: z.boolean().optional(),
    addresses: z.boolean().optional(),
    payments: z.boolean().optional(),
    shipments: z.boolean().optional(),
    statusHistory: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const OrderFindFirstSchema: z.ZodType<Prisma.OrderFindFirstArgs> = z.object({ select: OrderFindFirstSelectSchema.optional(), include: z.lazy(() => OrderIncludeObjectSchema.optional()), orderBy: z.union([OrderOrderByWithRelationInputObjectSchema, OrderOrderByWithRelationInputObjectSchema.array()]).optional(), where: OrderWhereInputObjectSchema.optional(), cursor: OrderWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OrderScalarFieldEnumSchema, OrderScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.OrderFindFirstArgs>;

export const OrderFindFirstZodSchema = z.object({ select: OrderFindFirstSelectSchema.optional(), include: z.lazy(() => OrderIncludeObjectSchema.optional()), orderBy: z.union([OrderOrderByWithRelationInputObjectSchema, OrderOrderByWithRelationInputObjectSchema.array()]).optional(), where: OrderWhereInputObjectSchema.optional(), cursor: OrderWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OrderScalarFieldEnumSchema, OrderScalarFieldEnumSchema.array()]).optional() }).strict();