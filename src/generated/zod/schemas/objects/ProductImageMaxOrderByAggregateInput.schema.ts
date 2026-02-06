import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  objectKey: SortOrderSchema.optional(),
  altText: SortOrderSchema.optional(),
  sortOrder: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ProductImageMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductImageMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductImageMaxOrderByAggregateInput>;
export const ProductImageMaxOrderByAggregateInputObjectZodSchema = makeSchema();
