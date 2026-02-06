import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductCollectionSelectObjectSchema as ProductCollectionSelectObjectSchema } from './objects/ProductCollectionSelect.schema';
import { ProductCollectionCreateManyInputObjectSchema as ProductCollectionCreateManyInputObjectSchema } from './objects/ProductCollectionCreateManyInput.schema';

export const ProductCollectionCreateManyAndReturnSchema: z.ZodType<Prisma.ProductCollectionCreateManyAndReturnArgs> = z.object({ select: ProductCollectionSelectObjectSchema.optional(), data: z.union([ ProductCollectionCreateManyInputObjectSchema, z.array(ProductCollectionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ProductCollectionCreateManyAndReturnArgs>;

export const ProductCollectionCreateManyAndReturnZodSchema = z.object({ select: ProductCollectionSelectObjectSchema.optional(), data: z.union([ ProductCollectionCreateManyInputObjectSchema, z.array(ProductCollectionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();