import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ProductCollectionCountOrderByAggregateInputObjectSchema as ProductCollectionCountOrderByAggregateInputObjectSchema } from './ProductCollectionCountOrderByAggregateInput.schema';
import { ProductCollectionAvgOrderByAggregateInputObjectSchema as ProductCollectionAvgOrderByAggregateInputObjectSchema } from './ProductCollectionAvgOrderByAggregateInput.schema';
import { ProductCollectionMaxOrderByAggregateInputObjectSchema as ProductCollectionMaxOrderByAggregateInputObjectSchema } from './ProductCollectionMaxOrderByAggregateInput.schema';
import { ProductCollectionMinOrderByAggregateInputObjectSchema as ProductCollectionMinOrderByAggregateInputObjectSchema } from './ProductCollectionMinOrderByAggregateInput.schema';
import { ProductCollectionSumOrderByAggregateInputObjectSchema as ProductCollectionSumOrderByAggregateInputObjectSchema } from './ProductCollectionSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  productId: SortOrderSchema.optional(),
  collectionId: SortOrderSchema.optional(),
  sortOrder: SortOrderSchema.optional(),
  _count: z.lazy(() => ProductCollectionCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ProductCollectionAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ProductCollectionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ProductCollectionMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ProductCollectionSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ProductCollectionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ProductCollectionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionOrderByWithAggregationInput>;
export const ProductCollectionOrderByWithAggregationInputObjectZodSchema = makeSchema();
