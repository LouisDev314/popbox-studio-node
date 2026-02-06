import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  productId: z.literal(true).optional(),
  objectKey: z.literal(true).optional(),
  altText: z.literal(true).optional(),
  sortOrder: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const ProductImageMinAggregateInputObjectSchema: z.ZodType<Prisma.ProductImageMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductImageMinAggregateInputType>;
export const ProductImageMinAggregateInputObjectZodSchema = makeSchema();
