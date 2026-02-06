import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  productId: z.literal(true).optional(),
  collectionId: z.literal(true).optional(),
  sortOrder: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ProductCollectionCountAggregateInputObjectSchema: z.ZodType<Prisma.ProductCollectionCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionCountAggregateInputType>;
export const ProductCollectionCountAggregateInputObjectZodSchema = makeSchema();
