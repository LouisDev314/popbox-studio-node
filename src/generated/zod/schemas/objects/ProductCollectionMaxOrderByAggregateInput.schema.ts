import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  productId: SortOrderSchema.optional(),
  collectionId: SortOrderSchema.optional(),
  sortOrder: SortOrderSchema.optional()
}).strict();
export const ProductCollectionMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductCollectionMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionMaxOrderByAggregateInput>;
export const ProductCollectionMaxOrderByAggregateInputObjectZodSchema = makeSchema();
