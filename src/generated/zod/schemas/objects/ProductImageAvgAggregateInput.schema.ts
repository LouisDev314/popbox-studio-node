import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  sortOrder: z.literal(true).optional()
}).strict();
export const ProductImageAvgAggregateInputObjectSchema: z.ZodType<Prisma.ProductImageAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductImageAvgAggregateInputType>;
export const ProductImageAvgAggregateInputObjectZodSchema = makeSchema();
