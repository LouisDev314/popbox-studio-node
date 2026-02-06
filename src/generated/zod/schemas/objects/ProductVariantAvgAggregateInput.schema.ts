import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  price: z.literal(true).optional(),
  stock: z.literal(true).optional(),
  reservedStock: z.literal(true).optional(),
  sortOrder: z.literal(true).optional()
}).strict();
export const ProductVariantAvgAggregateInputObjectSchema: z.ZodType<Prisma.ProductVariantAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantAvgAggregateInputType>;
export const ProductVariantAvgAggregateInputObjectZodSchema = makeSchema();
