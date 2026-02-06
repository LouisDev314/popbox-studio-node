import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  productId: z.string(),
  sortOrder: z.number().int().optional()
}).strict();
export const ProductCollectionUncheckedCreateWithoutCollectionInputObjectSchema: z.ZodType<Prisma.ProductCollectionUncheckedCreateWithoutCollectionInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionUncheckedCreateWithoutCollectionInput>;
export const ProductCollectionUncheckedCreateWithoutCollectionInputObjectZodSchema = makeSchema();
