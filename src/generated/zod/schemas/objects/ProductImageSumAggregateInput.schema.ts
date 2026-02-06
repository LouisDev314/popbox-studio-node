import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  sortOrder: z.literal(true).optional()
}).strict();
export const ProductImageSumAggregateInputObjectSchema: z.ZodType<Prisma.ProductImageSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductImageSumAggregateInputType>;
export const ProductImageSumAggregateInputObjectZodSchema = makeSchema();
