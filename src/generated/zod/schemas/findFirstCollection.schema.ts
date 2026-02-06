import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CollectionIncludeObjectSchema as CollectionIncludeObjectSchema } from './objects/CollectionInclude.schema';
import { CollectionOrderByWithRelationInputObjectSchema as CollectionOrderByWithRelationInputObjectSchema } from './objects/CollectionOrderByWithRelationInput.schema';
import { CollectionWhereInputObjectSchema as CollectionWhereInputObjectSchema } from './objects/CollectionWhereInput.schema';
import { CollectionWhereUniqueInputObjectSchema as CollectionWhereUniqueInputObjectSchema } from './objects/CollectionWhereUniqueInput.schema';
import { CollectionScalarFieldEnumSchema } from './enums/CollectionScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CollectionFindFirstSelectSchema: z.ZodType<Prisma.CollectionSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    isActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    products: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.CollectionSelect>;

export const CollectionFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    isActive: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    products: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const CollectionFindFirstSchema: z.ZodType<Prisma.CollectionFindFirstArgs> = z.object({ select: CollectionFindFirstSelectSchema.optional(), include: z.lazy(() => CollectionIncludeObjectSchema.optional()), orderBy: z.union([CollectionOrderByWithRelationInputObjectSchema, CollectionOrderByWithRelationInputObjectSchema.array()]).optional(), where: CollectionWhereInputObjectSchema.optional(), cursor: CollectionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CollectionScalarFieldEnumSchema, CollectionScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.CollectionFindFirstArgs>;

export const CollectionFindFirstZodSchema = z.object({ select: CollectionFindFirstSelectSchema.optional(), include: z.lazy(() => CollectionIncludeObjectSchema.optional()), orderBy: z.union([CollectionOrderByWithRelationInputObjectSchema, CollectionOrderByWithRelationInputObjectSchema.array()]).optional(), where: CollectionWhereInputObjectSchema.optional(), cursor: CollectionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([CollectionScalarFieldEnumSchema, CollectionScalarFieldEnumSchema.array()]).optional() }).strict();