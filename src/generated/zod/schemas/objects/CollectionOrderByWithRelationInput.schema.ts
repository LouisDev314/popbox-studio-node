import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ProductCollectionOrderByRelationAggregateInputObjectSchema as ProductCollectionOrderByRelationAggregateInputObjectSchema } from './ProductCollectionOrderByRelationAggregateInput.schema';
import { CollectionOrderByRelevanceInputObjectSchema as CollectionOrderByRelevanceInputObjectSchema } from './CollectionOrderByRelevanceInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  products: z.lazy(() => ProductCollectionOrderByRelationAggregateInputObjectSchema).optional(),
  _relevance: z.lazy(() => CollectionOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const CollectionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CollectionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CollectionOrderByWithRelationInput>;
export const CollectionOrderByWithRelationInputObjectZodSchema = makeSchema();
