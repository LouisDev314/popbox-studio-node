import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductCollectionIncludeObjectSchema as ProductCollectionIncludeObjectSchema } from './objects/ProductCollectionInclude.schema';
import { ProductCollectionOrderByWithRelationInputObjectSchema as ProductCollectionOrderByWithRelationInputObjectSchema } from './objects/ProductCollectionOrderByWithRelationInput.schema';
import { ProductCollectionWhereInputObjectSchema as ProductCollectionWhereInputObjectSchema } from './objects/ProductCollectionWhereInput.schema';
import { ProductCollectionWhereUniqueInputObjectSchema as ProductCollectionWhereUniqueInputObjectSchema } from './objects/ProductCollectionWhereUniqueInput.schema';
import { ProductCollectionScalarFieldEnumSchema } from './enums/ProductCollectionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProductCollectionFindManySelectSchema: z.ZodType<Prisma.ProductCollectionSelect> = z.object({
    productId: z.boolean().optional(),
    collectionId: z.boolean().optional(),
    sortOrder: z.boolean().optional(),
    product: z.boolean().optional(),
    collection: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ProductCollectionSelect>;

export const ProductCollectionFindManySelectZodSchema = z.object({
    productId: z.boolean().optional(),
    collectionId: z.boolean().optional(),
    sortOrder: z.boolean().optional(),
    product: z.boolean().optional(),
    collection: z.boolean().optional()
  }).strict();

export const ProductCollectionFindManySchema: z.ZodType<Prisma.ProductCollectionFindManyArgs> = z.object({ select: ProductCollectionFindManySelectSchema.optional(), include: z.lazy(() => ProductCollectionIncludeObjectSchema.optional()), orderBy: z.union([ProductCollectionOrderByWithRelationInputObjectSchema, ProductCollectionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductCollectionWhereInputObjectSchema.optional(), cursor: ProductCollectionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProductCollectionScalarFieldEnumSchema, ProductCollectionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ProductCollectionFindManyArgs>;

export const ProductCollectionFindManyZodSchema = z.object({ select: ProductCollectionFindManySelectSchema.optional(), include: z.lazy(() => ProductCollectionIncludeObjectSchema.optional()), orderBy: z.union([ProductCollectionOrderByWithRelationInputObjectSchema, ProductCollectionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductCollectionWhereInputObjectSchema.optional(), cursor: ProductCollectionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProductCollectionScalarFieldEnumSchema, ProductCollectionScalarFieldEnumSchema.array()]).optional() }).strict();