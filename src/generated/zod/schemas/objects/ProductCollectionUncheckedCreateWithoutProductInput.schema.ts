import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  collectionId: z.string(),
  sortOrder: z.number().int().optional()
}).strict();
export const ProductCollectionUncheckedCreateWithoutProductInputObjectSchema: z.ZodType<Prisma.ProductCollectionUncheckedCreateWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionUncheckedCreateWithoutProductInput>;
export const ProductCollectionUncheckedCreateWithoutProductInputObjectZodSchema = makeSchema();
