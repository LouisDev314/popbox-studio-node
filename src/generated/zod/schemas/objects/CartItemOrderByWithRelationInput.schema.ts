import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { CartOrderByWithRelationInputObjectSchema as CartOrderByWithRelationInputObjectSchema } from './CartOrderByWithRelationInput.schema';
import { ProductOrderByWithRelationInputObjectSchema as ProductOrderByWithRelationInputObjectSchema } from './ProductOrderByWithRelationInput.schema';
import { ProductVariantOrderByWithRelationInputObjectSchema as ProductVariantOrderByWithRelationInputObjectSchema } from './ProductVariantOrderByWithRelationInput.schema';
import { CartItemOrderByRelevanceInputObjectSchema as CartItemOrderByRelevanceInputObjectSchema } from './CartItemOrderByRelevanceInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  cartId: SortOrderSchema.optional(),
  productId: SortOrderSchema.optional(),
  variantId: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  cart: z.lazy(() => CartOrderByWithRelationInputObjectSchema).optional(),
  product: z.lazy(() => ProductOrderByWithRelationInputObjectSchema).optional(),
  variant: z.lazy(() => ProductVariantOrderByWithRelationInputObjectSchema).optional(),
  _relevance: z.lazy(() => CartItemOrderByRelevanceInputObjectSchema).optional()
}).strict();
export const CartItemOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CartItemOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemOrderByWithRelationInput>;
export const CartItemOrderByWithRelationInputObjectZodSchema = makeSchema();
