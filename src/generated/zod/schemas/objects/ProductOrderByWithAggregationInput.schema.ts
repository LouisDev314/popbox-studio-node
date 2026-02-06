import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ProductCountOrderByAggregateInputObjectSchema as ProductCountOrderByAggregateInputObjectSchema } from './ProductCountOrderByAggregateInput.schema';
import { ProductMaxOrderByAggregateInputObjectSchema as ProductMaxOrderByAggregateInputObjectSchema } from './ProductMaxOrderByAggregateInput.schema';
import { ProductMinOrderByAggregateInputObjectSchema as ProductMinOrderByAggregateInputObjectSchema } from './ProductMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  vendor: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  categoryId: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => ProductCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ProductMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ProductMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ProductOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ProductOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOrderByWithAggregationInput>;
export const ProductOrderByWithAggregationInputObjectZodSchema = makeSchema();
