import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  productId: z.string(),
  collectionId: z.string(),
  sortOrder: z.number().int().optional()
}).strict();
export const ProductCollectionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ProductCollectionUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionUncheckedCreateInput>;
export const ProductCollectionUncheckedCreateInputObjectZodSchema = makeSchema();
