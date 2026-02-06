import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  price: SortOrderSchema.optional(),
  stock: SortOrderSchema.optional(),
  reservedStock: SortOrderSchema.optional(),
  sortOrder: SortOrderSchema.optional()
}).strict();
export const ProductVariantAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductVariantAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantAvgOrderByAggregateInput>;
export const ProductVariantAvgOrderByAggregateInputObjectZodSchema = makeSchema();
