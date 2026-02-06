import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CartItemIncludeObjectSchema as CartItemIncludeObjectSchema } from './objects/CartItemInclude.schema';
import { CartItemOrderByWithRelationInputObjectSchema as CartItemOrderByWithRelationInputObjectSchema } from './objects/CartItemOrderByWithRelationInput.schema';
import { CartItemWhereInputObjectSchema as CartItemWhereInputObjectSchema } from './objects/CartItemWhereInput.schema';
import { CartItemWhereUniqueInputObjectSchema as CartItemWhereUniqueInputObjectSchema } from './objects/CartItemWhereUniqueInput.schema';
import { CartItemScalarFieldEnumSchema } from './enums/CartItemScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CartItemFindFirstSelectSchema: z.ZodType<Prisma.CartItemSelect> = z.object({
    id: z.boolean().optional(),
    cartId: z.boolean().optional(),
    productId: z.boolean().optional(),
    variantId: z.boolean().optional(),
    quantity: z.boolean().optional(),
    cart: z.boolean().optional(),
    product: z.boolean().optional(),
    variant: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CartItemSelect>;

export const CartItemFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    cartId: z.boolean().optional(),
    productId: z.boolean().optional(),
    variantId: z.boolean().optional(),
    quantity: z.boolean().optional(),
    cart: z.boolean().optional(),
    product: z.boolean().optional(),
    variant: z.boolean().optional()
  }).strict();

export const CartItemFindFirstSchema: z.ZodType<Prisma.CartItemFindFirstArgs> = z.object({ select: CartItemFindFirstSelectSchema.optional(), include: z.lazy(() => CartItemIncludeObjectSchema.optional()), orderBy: z.union([CartItemOrderByWithRelationInputObjectSchema, CartItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: CartItemWhereInputObjectSchema.optional(), cursor: CartItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CartItemScalarFieldEnumSchema, CartItemScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CartItemFindFirstArgs>;

export const CartItemFindFirstZodSchema = z.object({ select: CartItemFindFirstSelectSchema.optional(), include: z.lazy(() => CartItemIncludeObjectSchema.optional()), orderBy: z.union([CartItemOrderByWithRelationInputObjectSchema, CartItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: CartItemWhereInputObjectSchema.optional(), cursor: CartItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CartItemScalarFieldEnumSchema, CartItemScalarFieldEnumSchema.array()]).optional() }).strict();