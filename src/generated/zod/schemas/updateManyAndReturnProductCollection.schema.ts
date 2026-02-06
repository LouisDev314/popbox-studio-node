import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductCollectionSelectObjectSchema as ProductCollectionSelectObjectSchema } from './objects/ProductCollectionSelect.schema';
import { ProductCollectionUpdateManyMutationInputObjectSchema as ProductCollectionUpdateManyMutationInputObjectSchema } from './objects/ProductCollectionUpdateManyMutationInput.schema';
import { ProductCollectionWhereInputObjectSchema as ProductCollectionWhereInputObjectSchema } from './objects/ProductCollectionWhereInput.schema';

export const ProductCollectionUpdateManyAndReturnSchema: z.ZodType<Prisma.ProductCollectionUpdateManyAndReturnArgs> = z.object({ select: ProductCollectionSelectObjectSchema.optional(), data: ProductCollectionUpdateManyMutationInputObjectSchema, where: ProductCollectionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProductCollectionUpdateManyAndReturnArgs>;

export const ProductCollectionUpdateManyAndReturnZodSchema = z.object({ select: ProductCollectionSelectObjectSchema.optional(), data: ProductCollectionUpdateManyMutationInputObjectSchema, where: ProductCollectionWhereInputObjectSchema.optional() }).strict();