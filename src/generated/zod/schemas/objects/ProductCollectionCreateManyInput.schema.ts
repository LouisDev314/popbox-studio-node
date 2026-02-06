import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  productId: z.string(),
  collectionId: z.string(),
  sortOrder: z.number().int().optional()
}).strict();
export const ProductCollectionCreateManyInputObjectSchema: z.ZodType<Prisma.ProductCollectionCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionCreateManyInput>;
export const ProductCollectionCreateManyInputObjectZodSchema = makeSchema();
