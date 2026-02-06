import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductCollectionWhereInputObjectSchema as ProductCollectionWhereInputObjectSchema } from './objects/ProductCollectionWhereInput.schema';

export const ProductCollectionDeleteManySchema: z.ZodType<Prisma.ProductCollectionDeleteManyArgs> = z.object({ where: ProductCollectionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProductCollectionDeleteManyArgs>;

export const ProductCollectionDeleteManyZodSchema = z.object({ where: ProductCollectionWhereInputObjectSchema.optional() }).strict();