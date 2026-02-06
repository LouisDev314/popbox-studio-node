import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CategoryOrderByWithRelationInputObjectSchema as CategoryOrderByWithRelationInputObjectSchema } from './CategoryOrderByWithRelationInput.schema';
import { ProductVariantOrderByRelationAggregateInputObjectSchema as ProductVariantOrderByRelationAggregateInputObjectSchema } from './ProductVariantOrderByRelationAggregateInput.schema';
import { ProductImageOrderByRelationAggregateInputObjectSchema as ProductImageOrderByRelationAggregateInputObjectSchema } from './ProductImageOrderByRelationAggregateInput.schema';
import { ProductCollectionOrderByRelationAggregateInputObjectSchema as ProductCollectionOrderByRelationAggregateInputObjectSchema } from './ProductCollectionOrderByRelationAggregateInput.schema';
import { WishlistItemOrderByRelationAggregateInputObjectSchema as WishlistItemOrderByRelationAggregateInputObjectSchema } from './WishlistItemOrderByRelationAggregateInput.schema';
import { CartItemOrderByRelationAggregateInputObjectSchema as CartItemOrderByRelationAggregateInputObjectSchema } from './CartItemOrderByRelationAggregateInput.schema';
import { OrderItemOrderByRelationAggregateInputObjectSchema as OrderItemOrderByRelationAggregateInputObjectSchema } from './OrderItemOrderByRelationAggregateInput.schema';
import { ProductOrderByRelevanceInputObjectSchema as ProductOrderByRelevanceInputObjectSchema } from './ProductOrderByRelevanceInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  vendor: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  categoryId: SortOrderSchema.optional(),
  isActive: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  category: z.lazy(() => CategoryOrderByWithRelationInputObjectSchema).optional(),
  variants: z.lazy(() => ProductVariantOrderByRelationAggregateInputObjectSchema).optional(),
  images: z.lazy(() => ProductImageOrderByRelationAggregateInputObjectSchema).optional(),
  collections: z.lazy(() => ProductCollectionOrderByRelationAggregateInputObjectSchema).optional(),
  wishlistItems: z.lazy(() => WishlistItemOrderByRelationAggregateInputObjectSchema).optional(),
  cartItems: z.lazy(() => CartItemOrderByRelationAggregateInputObjectSchema).optional(),
  orderItems: z.lazy(() => OrderItemOrderByRelationAggregateInputObjectSchema).optional(),
  _relevance: z.lazy(() => ProductOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const ProductOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ProductOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductOrderByWithRelationInput>;
export const ProductOrderByWithRelationInputObjectZodSchema = makeSchema();
