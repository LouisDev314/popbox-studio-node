import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { WishlistItemIncludeObjectSchema as WishlistItemIncludeObjectSchema } from './objects/WishlistItemInclude.schema';
import { WishlistItemOrderByWithRelationInputObjectSchema as WishlistItemOrderByWithRelationInputObjectSchema } from './objects/WishlistItemOrderByWithRelationInput.schema';
import { WishlistItemWhereInputObjectSchema as WishlistItemWhereInputObjectSchema } from './objects/WishlistItemWhereInput.schema';
import { WishlistItemWhereUniqueInputObjectSchema as WishlistItemWhereUniqueInputObjectSchema } from './objects/WishlistItemWhereUniqueInput.schema';
import { WishlistItemScalarFieldEnumSchema } from './enums/WishlistItemScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const WishlistItemFindManySelectSchema: z.ZodType<Prisma.WishlistItemSelect> = z.object({
    id: z.boolean().optional(),
    wishlistId: z.boolean().optional(),
    productId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    wishlist: z.boolean().optional(),
    product: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.WishlistItemSelect>;

export const WishlistItemFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    wishlistId: z.boolean().optional(),
    productId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    wishlist: z.boolean().optional(),
    product: z.boolean().optional()
  }).strict();

export const WishlistItemFindManySchema: z.ZodType<Prisma.WishlistItemFindManyArgs> = z.object({ select: WishlistItemFindManySelectSchema.optional(), include: z.lazy(() => WishlistItemIncludeObjectSchema.optional()), orderBy: z.union([WishlistItemOrderByWithRelationInputObjectSchema, WishlistItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: WishlistItemWhereInputObjectSchema.optional(), cursor: WishlistItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([WishlistItemScalarFieldEnumSchema, WishlistItemScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.WishlistItemFindManyArgs>;

export const WishlistItemFindManyZodSchema = z.object({ select: WishlistItemFindManySelectSchema.optional(), include: z.lazy(() => WishlistItemIncludeObjectSchema.optional()), orderBy: z.union([WishlistItemOrderByWithRelationInputObjectSchema, WishlistItemOrderByWithRelationInputObjectSchema.array()]).optional(), where: WishlistItemWhereInputObjectSchema.optional(), cursor: WishlistItemWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([WishlistItemScalarFieldEnumSchema, WishlistItemScalarFieldEnumSchema.array()]).optional() }).strict();