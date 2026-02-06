import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OrderAddressIncludeObjectSchema as OrderAddressIncludeObjectSchema } from './objects/OrderAddressInclude.schema';
import { OrderAddressOrderByWithRelationInputObjectSchema as OrderAddressOrderByWithRelationInputObjectSchema } from './objects/OrderAddressOrderByWithRelationInput.schema';
import { OrderAddressWhereInputObjectSchema as OrderAddressWhereInputObjectSchema } from './objects/OrderAddressWhereInput.schema';
import { OrderAddressWhereUniqueInputObjectSchema as OrderAddressWhereUniqueInputObjectSchema } from './objects/OrderAddressWhereUniqueInput.schema';
import { OrderAddressScalarFieldEnumSchema } from './enums/OrderAddressScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const OrderAddressFindManySelectSchema: z.ZodType<Prisma.OrderAddressSelect> = z.object({
    id: z.boolean().optional(),
    orderId: z.boolean().optional(),
    type: z.boolean().optional(),
    name: z.boolean().optional(),
    line1: z.boolean().optional(),
    line2: z.boolean().optional(),
    city: z.boolean().optional(),
    state: z.boolean().optional(),
    postalCode: z.boolean().optional(),
    country: z.boolean().optional(),
    phone: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    order: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.OrderAddressSelect>;

export const OrderAddressFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    orderId: z.boolean().optional(),
    type: z.boolean().optional(),
    name: z.boolean().optional(),
    line1: z.boolean().optional(),
    line2: z.boolean().optional(),
    city: z.boolean().optional(),
    state: z.boolean().optional(),
    postalCode: z.boolean().optional(),
    country: z.boolean().optional(),
    phone: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    order: z.boolean().optional()
  }).strict();

export const OrderAddressFindManySchema: z.ZodType<Prisma.OrderAddressFindManyArgs> = z.object({ select: OrderAddressFindManySelectSchema.optional(), include: z.lazy(() => OrderAddressIncludeObjectSchema.optional()), orderBy: z.union([OrderAddressOrderByWithRelationInputObjectSchema, OrderAddressOrderByWithRelationInputObjectSchema.array()]).optional(), where: OrderAddressWhereInputObjectSchema.optional(), cursor: OrderAddressWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OrderAddressScalarFieldEnumSchema, OrderAddressScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.OrderAddressFindManyArgs>;

export const OrderAddressFindManyZodSchema = z.object({ select: OrderAddressFindManySelectSchema.optional(), include: z.lazy(() => OrderAddressIncludeObjectSchema.optional()), orderBy: z.union([OrderAddressOrderByWithRelationInputObjectSchema, OrderAddressOrderByWithRelationInputObjectSchema.array()]).optional(), where: OrderAddressWhereInputObjectSchema.optional(), cursor: OrderAddressWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OrderAddressScalarFieldEnumSchema, OrderAddressScalarFieldEnumSchema.array()]).optional() }).strict();