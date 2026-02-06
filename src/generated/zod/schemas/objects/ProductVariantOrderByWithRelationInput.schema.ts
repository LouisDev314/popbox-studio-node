import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ProductOrderByWithRelationInputObjectSchema as ProductOrderByWithRelationInputObjectSchema } from './ProductOrderByWithRelationInput.schema';
import { CartItemOrderByRelationAggregateInputObjectSchema as CartItemOrderByRelationAggregateInputObjectSchema } from './CartItemOrderByRelationAggregateInput.schema';
import { OrderItemOrderByRelationAggregateInputObjectSchema as OrderItemOrderByRelationAggregateInputObjectSchema } from './OrderItemOrderByRelationAggregateInput.schema';
import { ProductVariantOrderByRelevanceInputObjectSchema as ProductVariantOrderByRelevanceInputObjectSchema } from './ProductVariantOrderByRelevanceInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  currency: SortOrderSchema.optional(),
  stock: SortOrderSchema.optional(),
  reservedStock: SortOrderSchema.optional(),
  imageObjectKey: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isActive: SortOrderSchema.optional(),
  sortOrder: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputObjectSchema).optional(),
  cartItems: z.lazy(() => CartItemOrderByRelationAggregateInputObjectSchema).optional(),
  orderItems: z.lazy(() => OrderItemOrderByRelationAggregateInputObjectSchema).optional(),
  _relevance: z.lazy(() => ProductVariantOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const ProductVariantOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ProductVariantOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductVariantOrderByWithRelationInput>;
export const ProductVariantOrderByWithRelationInputObjectZodSchema = makeSchema();
