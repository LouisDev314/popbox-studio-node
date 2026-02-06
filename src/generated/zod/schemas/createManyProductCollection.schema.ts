import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ProductCollectionCreateManyInputObjectSchema as ProductCollectionCreateManyInputObjectSchema } from './objects/ProductCollectionCreateManyInput.schema';

export const ProductCollectionCreateManySchema: z.ZodType<Prisma.ProductCollectionCreateManyArgs> = z.object({ data: z.union([ ProductCollectionCreateManyInputObjectSchema, z.array(ProductCollectionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ProductCollectionCreateManyArgs>;

export const ProductCollectionCreateManyZodSchema = z.object({ data: z.union([ ProductCollectionCreateManyInputObjectSchema, z.array(ProductCollectionCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();