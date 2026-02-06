import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductCollectionSelectObjectSchema as ProductCollectionSelectObjectSchema } from './objects/ProductCollectionSelect.schema';
import { ProductCollectionIncludeObjectSchema as ProductCollectionIncludeObjectSchema } from './objects/ProductCollectionInclude.schema';
import { ProductCollectionWhereUniqueInputObjectSchema as ProductCollectionWhereUniqueInputObjectSchema } from './objects/ProductCollectionWhereUniqueInput.schema';

export const ProductCollectionFindUniqueOrThrowSchema: z.ZodType<Prisma.ProductCollectionFindUniqueOrThrowArgs> = z.object({ select: ProductCollectionSelectObjectSchema.optional(), include: ProductCollectionIncludeObjectSchema.optional(), where: ProductCollectionWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProductCollectionFindUniqueOrThrowArgs>;

export const ProductCollectionFindUniqueOrThrowZodSchema = z.object({ select: ProductCollectionSelectObjectSchema.optional(), include: ProductCollectionIncludeObjectSchema.optional(), where: ProductCollectionWhereUniqueInputObjectSchema }).strict();