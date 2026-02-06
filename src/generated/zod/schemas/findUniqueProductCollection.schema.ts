import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductCollectionSelectObjectSchema as ProductCollectionSelectObjectSchema } from './objects/ProductCollectionSelect.schema';
import { ProductCollectionIncludeObjectSchema as ProductCollectionIncludeObjectSchema } from './objects/ProductCollectionInclude.schema';
import { ProductCollectionWhereUniqueInputObjectSchema as ProductCollectionWhereUniqueInputObjectSchema } from './objects/ProductCollectionWhereUniqueInput.schema';

export const ProductCollectionFindUniqueSchema: z.ZodType<Prisma.ProductCollectionFindUniqueArgs> = z.object({ select: ProductCollectionSelectObjectSchema.optional(), include: ProductCollectionIncludeObjectSchema.optional(), where: ProductCollectionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProductCollectionFindUniqueArgs>;

export const ProductCollectionFindUniqueZodSchema = z.object({ select: ProductCollectionSelectObjectSchema.optional(), include: ProductCollectionIncludeObjectSchema.optional(), where: ProductCollectionWhereUniqueInputObjectSchema }).strict();