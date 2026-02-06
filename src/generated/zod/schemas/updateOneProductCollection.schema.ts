import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductCollectionSelectObjectSchema as ProductCollectionSelectObjectSchema } from './objects/ProductCollectionSelect.schema';
import { ProductCollectionIncludeObjectSchema as ProductCollectionIncludeObjectSchema } from './objects/ProductCollectionInclude.schema';
import { ProductCollectionUpdateInputObjectSchema as ProductCollectionUpdateInputObjectSchema } from './objects/ProductCollectionUpdateInput.schema';
import { ProductCollectionUncheckedUpdateInputObjectSchema as ProductCollectionUncheckedUpdateInputObjectSchema } from './objects/ProductCollectionUncheckedUpdateInput.schema';
import { ProductCollectionWhereUniqueInputObjectSchema as ProductCollectionWhereUniqueInputObjectSchema } from './objects/ProductCollectionWhereUniqueInput.schema';

export const ProductCollectionUpdateOneSchema: z.ZodType<Prisma.ProductCollectionUpdateArgs> = z.object({ select: ProductCollectionSelectObjectSchema.optional(), include: ProductCollectionIncludeObjectSchema.optional(), data: z.union([ProductCollectionUpdateInputObjectSchema, ProductCollectionUncheckedUpdateInputObjectSchema]), where: ProductCollectionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProductCollectionUpdateArgs>;

export const ProductCollectionUpdateOneZodSchema = z.object({ select: ProductCollectionSelectObjectSchema.optional(), include: ProductCollectionIncludeObjectSchema.optional(), data: z.union([ProductCollectionUpdateInputObjectSchema, ProductCollectionUncheckedUpdateInputObjectSchema]), where: ProductCollectionWhereUniqueInputObjectSchema }).strict();