import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ProductOrderByWithRelationInputObjectSchema as ProductOrderByWithRelationInputObjectSchema } from './ProductOrderByWithRelationInput.schema';
import { CollectionOrderByWithRelationInputObjectSchema as CollectionOrderByWithRelationInputObjectSchema } from './CollectionOrderByWithRelationInput.schema';
import { ProductCollectionOrderByRelevanceInputObjectSchema as ProductCollectionOrderByRelevanceInputObjectSchema } from './ProductCollectionOrderByRelevanceInput.schema'

const makeSchema = () => z.object({
  productId: SortOrderSchema.optional(),
  collectionId: SortOrderSchema.optional(),
  sortOrder: SortOrderSchema.optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputObjectSchema).optional(),
  collection: z.lazy(() => CollectionOrderByWithRelationInputObjectSchema).optional(),
  _relevance: z.lazy(() => ProductCollectionOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const ProductCollectionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ProductCollectionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCollectionOrderByWithRelationInput>;
export const ProductCollectionOrderByWithRelationInputObjectZodSchema = makeSchema();
