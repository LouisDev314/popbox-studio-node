import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  productId: SortOrderSchema.optional(),
  collectionId: SortOrderSchema.optional(),
  sortOrder: SortOrderSchema.optional()
}).strict();
export const ProductCollectionCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductCollectionCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionCountOrderByAggregateInput>;
export const ProductCollectionCountOrderByAggregateInputObjectZodSchema = makeSchema();
