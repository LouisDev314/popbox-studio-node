import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  sortOrder: SortOrderSchema.optional()
}).strict();
export const ProductCollectionSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductCollectionSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionSumOrderByAggregateInput>;
export const ProductCollectionSumOrderByAggregateInputObjectZodSchema = makeSchema();
