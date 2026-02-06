import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  productId: z.string(),
  sortOrder: z.number().int().optional()
}).strict();
export const ProductCollectionCreateManyCollectionInputObjectSchema: z.ZodType<Prisma.ProductCollectionCreateManyCollectionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionCreateManyCollectionInput>;
export const ProductCollectionCreateManyCollectionInputObjectZodSchema = makeSchema();
