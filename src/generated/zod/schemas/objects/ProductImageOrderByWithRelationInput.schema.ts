import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ProductOrderByWithRelationInputObjectSchema as ProductOrderByWithRelationInputObjectSchema } from './ProductOrderByWithRelationInput.schema';
import { ProductImageOrderByRelevanceInputObjectSchema as ProductImageOrderByRelevanceInputObjectSchema } from './ProductImageOrderByRelevanceInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  objectKey: SortOrderSchema.optional(),
  altText: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  sortOrder: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputObjectSchema).optional(),
  _relevance: z.lazy(() => ProductImageOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const ProductImageOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ProductImageOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductImageOrderByWithRelationInput>;
export const ProductImageOrderByWithRelationInputObjectZodSchema = makeSchema();
