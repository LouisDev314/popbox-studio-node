import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  productId: z.literal(true).optional(),
  collectionId: z.literal(true).optional(),
  sortOrder: z.literal(true).optional()
}).strict();
export const ProductCollectionMinAggregateInputObjectSchema: z.ZodType<Prisma.ProductCollectionMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionMinAggregateInputType>;
export const ProductCollectionMinAggregateInputObjectZodSchema = makeSchema();
