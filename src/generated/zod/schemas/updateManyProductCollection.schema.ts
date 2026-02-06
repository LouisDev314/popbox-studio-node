import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductCollectionUpdateManyMutationInputObjectSchema as ProductCollectionUpdateManyMutationInputObjectSchema } from './objects/ProductCollectionUpdateManyMutationInput.schema';
import { ProductCollectionWhereInputObjectSchema as ProductCollectionWhereInputObjectSchema } from './objects/ProductCollectionWhereInput.schema';

export const ProductCollectionUpdateManySchema: z.ZodType<Prisma.ProductCollectionUpdateManyArgs> = z.object({ data: ProductCollectionUpdateManyMutationInputObjectSchema, where: ProductCollectionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ProductCollectionUpdateManyArgs>;

export const ProductCollectionUpdateManyZodSchema = z.object({ data: ProductCollectionUpdateManyMutationInputObjectSchema, where: ProductCollectionWhereInputObjectSchema.optional() }).strict();