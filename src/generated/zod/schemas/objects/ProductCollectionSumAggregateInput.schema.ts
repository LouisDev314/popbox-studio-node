import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  sortOrder: z.literal(true).optional()
}).strict();
export const ProductCollectionSumAggregateInputObjectSchema: z.ZodType<Prisma.ProductCollectionSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionSumAggregateInputType>;
export const ProductCollectionSumAggregateInputObjectZodSchema = makeSchema();
