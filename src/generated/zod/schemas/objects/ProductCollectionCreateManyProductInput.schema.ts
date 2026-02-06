import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  collectionId: z.string(),
  sortOrder: z.number().int().optional()
}).strict();
export const ProductCollectionCreateManyProductInputObjectSchema: z.ZodType<Prisma.ProductCollectionCreateManyProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionCreateManyProductInput>;
export const ProductCollectionCreateManyProductInputObjectZodSchema = makeSchema();
